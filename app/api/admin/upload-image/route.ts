import { NextRequest, NextResponse } from "next/server";
import { verifyAuthToken, AUTH_COOKIE_NAME } from "@/lib/auth";
import { uploadImage } from "@/lib/cloudinary";
import { prisma } from "@/lib/db";

// Maximum file size: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Allowed image types
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.json(
        { error: "unauthorized" },
        { status: 401 }
      );
    }

    const payload = await verifyAuthToken(token);

    if (!payload) {
      return NextResponse.json(
        { error: "unauthorized" },
        { status: 401 }
      );
    }

    // Parse form data
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const blockId = formData.get("blockId") as string | null;
    const alt = formData.get("alt") as string | null;

    if (!file) {
      return NextResponse.json(
        { error: "missing_file" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "invalid_file_type", allowedTypes: ALLOWED_MIME_TYPES },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "file_too_large", maxSize: MAX_FILE_SIZE },
        { status: 400 }
      );
    }

    // Convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const uploadResult = await uploadImage(buffer, "reems/reems-blocks");

    // Save to database
    const image = await prisma.image.create({
      data: {
        url: uploadResult.url,
        publicId: uploadResult.publicId,
        alt: alt || null,
        blockId: blockId || null,
      },
    });

    return NextResponse.json({
      success: true,
      image: {
        id: image.id,
        url: image.url,
        alt: image.alt,
        publicId: image.publicId,
      },
    });
  } catch (error) {
    console.error("Upload image error:", error);
    return NextResponse.json(
      { error: "upload_failed", message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}


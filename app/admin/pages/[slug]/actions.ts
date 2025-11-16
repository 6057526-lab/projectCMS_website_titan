"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

export async function updateBlockAction(blockId: string, formData: FormData) {
  const title = formData.get("title") as string;
  const subtitle = formData.get("subtitle") as string;
  const body = formData.get("body") as string;
  const bulletsText = formData.get("bullets") as string;

  // Parse bullets from textarea (one bullet per line)
  let bullets: string[] | null = null;
  if (bulletsText && bulletsText.trim()) {
    const parsedBullets = bulletsText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    
    if (parsedBullets.length > 0) {
      bullets = parsedBullets;
    }
  }

  // Build update data
  // For Prisma JSON fields, we need to handle null values correctly
  const updateData: any = {
    title: title || null,
    subtitle: subtitle || null,
    body: body || null,
  };

  // Include bullets in update only if form field was submitted
  // If bulletsText was provided (even if empty), update bullets
  if (bulletsText !== null && bulletsText !== undefined) {
    // Form field was submitted - update bullets
    // Use null to clear it, or the array value to set it
    updateData.bullets = bullets;
  }
  // If bulletsText was not provided, don't include bullets in update (field not touched)

  // Update the block
  // Using 'any' type to bypass strict JSON type checking for null values
  await prisma.block.update({
    where: { id: blockId },
    data: updateData,
  });

  // Get the block's page slug for revalidation
  const block = await prisma.block.findUnique({
    where: { id: blockId },
    include: { page: true },
  });

  if (block) {
    // Revalidate the public page and admin page
    revalidatePath(`/${block.page.slug}`);
    revalidatePath(`/admin/pages/${block.page.slug}`);
  }

  return { success: true };
}


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

  // Build update data - use conditional property for bullets
  const updateData: {
    title: string | null;
    subtitle: string | null;
    body: string | null;
    bullets?: string[] | null;
  } = {
    title: title || null,
    subtitle: subtitle || null,
    body: body || null,
  };

  // Only include bullets if we have a value (including null to clear it)
  updateData.bullets = bullets;

  // Update the block
  await prisma.block.update({
    where: { id: blockId },
    data: updateData as {
      title: string | null;
      subtitle: string | null;
      body: string | null;
      bullets: string[] | null;
    },
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


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
    bullets = bulletsText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  }

  // Update the block
  await prisma.block.update({
    where: { id: blockId },
    data: {
      title: title || null,
      subtitle: subtitle || null,
      body: body || null,
      bullets: bullets,
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


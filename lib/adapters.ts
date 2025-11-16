// Define BlockType enum manually (Prisma doesn't export it directly in this version)
type BlockType =
  | "HERO"
  | "INTRO"
  | "MARKET_SEGMENT"
  | "LIFECYCLE_STAGE"
  | "LIFECYCLE_INTRO"
  | "CAPABILITY"
  | "WHEELS"
  | "COMPANY"
  | "CTA";

// Define Image type manually (Prisma doesn't export it directly in this version)
type Image = {
  id: string;
  url: string;
  publicId: string;
  alt: string | null;
  blockId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

// Define Block type manually (Prisma doesn't export it directly in this version)
type Block = {
  id: string;
  pageId: string;
  type: BlockType;
  key: string;
  title: string | null;
  subtitle: string | null;
  body: string | null;
  order: number;
  bullets: any;
  meta: any;
  images?: Image[];
  createdAt: Date;
  updatedAt: Date;
};

// Helper function to find blocks by type
function findBlocksByType(blocks: Block[], type: BlockType): Block[] {
  return blocks.filter((b) => b.type === type);
}

// Helper function to find a single block by key
function findBlockByKey(blocks: Block[], key: string): Block | undefined {
  return blocks.find((b) => b.key === key);
}

// Adapter for Hero + Intro section
export function adaptHeroAndIntro(blocks: Block[]) {
  const heroBlock = findBlockByKey(blocks, "hero");
  const introBlock = findBlockByKey(blocks, "intro");

  if (!heroBlock || !introBlock) {
    throw new Error("Hero or Intro block not found");
  }

  const heroMeta = heroBlock.meta as any;
  const introMeta = introBlock.meta as any;

  return {
    hero: {
      headline: heroBlock.title || "",
      subheadline: heroBlock.subtitle || "",
      description: heroBlock.body || "",
      buttons: heroMeta?.buttons || { primary: "", secondary: "" },
    },
    intro: {
      text: introBlock.body || "",
      bullets: (introBlock.bullets as string[]) || [],
      ctaButton: introMeta?.ctaButton || "",
    },
  };
}

// Adapter for Market Segments
export function adaptMarketSegments(blocks: Block[]) {
  const marketBlocks = findBlocksByType(blocks, "MARKET_SEGMENT");
  const headerBlock = marketBlocks.find((b) => (b.meta as any)?.isHeader);
  const segmentBlocks = marketBlocks.filter((b) => !(b.meta as any)?.isHeader);

  return {
    title: headerBlock?.title || "Market segments",
    subtitle: headerBlock?.subtitle || "",
    segments: segmentBlocks.map((block) => ({
      title: block.title || "",
      leadText: block.body || "",
      bullets: (block.bullets as string[]) || [],
    })),
  };
}

// Adapter for Full Product Lifecycle
export function adaptLifecycle(blocks: Block[]) {
  const lifecycleIntro = findBlockByKey(blocks, "lifecycle_intro");
  const stageBlocks = findBlocksByType(blocks, "LIFECYCLE_STAGE").sort(
    (a, b) => a.order - b.order
  );

  return {
    title: lifecycleIntro?.title || "Full product lifecycle",
    intro: lifecycleIntro?.body || "",
    phases: stageBlocks.map((block) => ({
      title: block.title || "",
      text: block.body || "",
    })),
  };
}

// Adapter for Capabilities
export function adaptCapabilities(blocks: Block[]) {
  const capabilityBlocks = findBlocksByType(blocks, "CAPABILITY");
  const headerBlock = capabilityBlocks.find((b) => (b.meta as any)?.isHeader);
  const itemBlocks = capabilityBlocks
    .filter((b) => !(b.meta as any)?.isHeader)
    .sort((a, b) => a.order - b.order);

  return {
    title: headerBlock?.title || "Capabilities",
    subtitle: headerBlock?.subtitle || "",
    items: itemBlocks.map((block) => {
      const meta = block.meta as any;
      // Get images from block.images if available, otherwise fall back to meta.photos (descriptions)
      const blockImages = block.images && block.images.length > 0
        ? block.images.map((img: Image) => ({ url: img.url, alt: img.alt || "" }))
        : [];
      const photoDescriptions = meta?.photos || [];
      
      return {
        title: block.title || "",
        photos: photoDescriptions, // Keep for backward compatibility
        photoUrls: blockImages, // New: actual image URLs from Cloudinary
        text: block.body || "",
        additionalBullets: (block.bullets as string[]) || undefined,
        additionalText: meta?.additionalText || undefined,
      };
    }),
  };
}

// Adapter for Forged Wheels
export function adaptForgedWheels(blocks: Block[]) {
  const wheelsBlock = findBlockByKey(blocks, "wheels");

  if (!wheelsBlock) {
    throw new Error("Wheels block not found");
  }

  const meta = wheelsBlock.meta as any;

  return {
    title: wheelsBlock.title || "",
    subtitle: wheelsBlock.subtitle || "",
    text: wheelsBlock.body || "",
    bullets: (wheelsBlock.bullets as string[]) || [],
    ctaButton: meta?.ctaButton || "",
  };
}

// Adapter for Company Section
export function adaptCompany(blocks: Block[]) {
  const companyBlock = findBlockByKey(blocks, "company");
  const ctaBlock = findBlockByKey(blocks, "final_cta");

  if (!companyBlock) {
    throw new Error("Company block not found");
  }

  const meta = companyBlock.meta as any;

  return {
    title: companyBlock.title || "",
    subtitle: companyBlock.subtitle || "",
    text: companyBlock.body || "",
    slogan: meta?.slogan || "",
    finalCta: ctaBlock?.body || "",
  };
}


import { PrismaClient } from "@prisma/client";
import { homeContent } from "../app/content/homeContent";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Clear existing data (but not users)
  await prisma.block.deleteMany({});
  await prisma.page.deleteMany({});

  // Create home page
  const homePage = await prisma.page.create({
    data: {
      slug: "home",
      title: "REEMS — Race & Engineering Elite Manufacturing Services",
    },
  });

  console.log(`✅ Created page: ${homePage.title} (slug: ${homePage.slug})`);

  let order = 0;

  // 1. Hero block
  await prisma.block.create({
    data: {
      pageId: homePage.id,
      type: "HERO",
      key: "hero",
      title: homeContent.hero.headline,
      subtitle: homeContent.hero.subheadline,
      body: homeContent.hero.description,
      order: order++,
      meta: {
        buttons: homeContent.hero.buttons,
      },
    },
  });
  console.log("✅ Created HERO block");

  // 2. Intro block
  await prisma.block.create({
    data: {
      pageId: homePage.id,
      type: "INTRO",
      key: "intro",
      body: homeContent.intro.text,
      order: order++,
      bullets: homeContent.intro.bullets,
      meta: {
        ctaButton: homeContent.intro.ctaButton,
      },
    },
  });
  console.log("✅ Created INTRO block");

  // 3. Market segments - header block
  await prisma.block.create({
    data: {
      pageId: homePage.id,
      type: "MARKET_SEGMENT",
      key: "market_segments_header",
      title: homeContent.marketSegments.title,
      subtitle: homeContent.marketSegments.subtitle,
      order: order++,
      meta: {
        isHeader: true,
      },
    },
  });
  console.log("✅ Created MARKET_SEGMENT header block");

  // Market segments - individual segments
  const segmentKeys = ["automotive", "aerospace", "industrial", "special"];
  for (let i = 0; i < homeContent.marketSegments.segments.length; i++) {
    const segment = homeContent.marketSegments.segments[i];
    await prisma.block.create({
      data: {
        pageId: homePage.id,
        type: "MARKET_SEGMENT",
        key: `market_${segmentKeys[i]}`,
        title: segment.title,
        body: segment.leadText,
        order: order++,
        bullets: segment.bullets,
      },
    });
    console.log(`✅ Created MARKET_SEGMENT block: ${segment.title}`);
  }

  // 4. Lifecycle - intro block
  await prisma.block.create({
    data: {
      pageId: homePage.id,
      type: "LIFECYCLE_INTRO",
      key: "lifecycle_intro",
      title: homeContent.lifecycle.title,
      body: homeContent.lifecycle.intro,
      order: order++,
    },
  });
  console.log("✅ Created LIFECYCLE_INTRO block");

  // Lifecycle - stages
  const stageKeys = ["rd", "engineering", "industrialization", "testing"];
  for (let i = 0; i < homeContent.lifecycle.phases.length; i++) {
    const phase = homeContent.lifecycle.phases[i];
    await prisma.block.create({
      data: {
        pageId: homePage.id,
        type: "LIFECYCLE_STAGE",
        key: `lifecycle_${stageKeys[i]}`,
        title: phase.title,
        body: phase.text,
        order: order++,
      },
    });
    console.log(`✅ Created LIFECYCLE_STAGE block: ${phase.title}`);
  }

  // 5. Capabilities - header block
  await prisma.block.create({
    data: {
      pageId: homePage.id,
      type: "CAPABILITY",
      key: "capabilities_header",
      title: homeContent.capabilities.title,
      subtitle: homeContent.capabilities.subtitle,
      order: order++,
      meta: {
        isHeader: true,
      },
    },
  });
  console.log("✅ Created CAPABILITY header block");

  // Capabilities - individual items
  const capabilityKeys = [
    "raw_materials",
    "forging",
    "extrusion_rolling",
    "machining",
    "printing",
    "surface_protection",
  ];
  for (let i = 0; i < homeContent.capabilities.items.length; i++) {
    const item = homeContent.capabilities.items[i];
    // Build block data with proper JSON field handling
    const blockData: any = {
      pageId: homePage.id,
      type: "CAPABILITY",
      key: `capability_${capabilityKeys[i]}`,
      title: item.title,
      body: item.text,
      order: order++,
      meta: {
        photos: item.photos,
        additionalText: item.additionalText || null,
      },
    };
    // Conditionally add bullets if they exist
    if (item.additionalBullets) {
      blockData.bullets = item.additionalBullets;
    } else {
      blockData.bullets = null;
    }
    await prisma.block.create({
      data: blockData,
    });
    console.log(`✅ Created CAPABILITY block: ${item.title}`);
  }

  // 6. Forged wheels block
  await prisma.block.create({
    data: {
      pageId: homePage.id,
      type: "WHEELS",
      key: "wheels",
      title: homeContent.forgedWheels.title,
      subtitle: homeContent.forgedWheels.subtitle,
      body: homeContent.forgedWheels.text,
      order: order++,
      bullets: homeContent.forgedWheels.bullets,
      meta: {
        ctaButton: homeContent.forgedWheels.ctaButton,
      },
    },
  });
  console.log("✅ Created WHEELS block");

  // 7. Company block
  await prisma.block.create({
    data: {
      pageId: homePage.id,
      type: "COMPANY",
      key: "company",
      title: homeContent.company.title,
      subtitle: homeContent.company.subtitle,
      body: homeContent.company.text,
      order: order++,
      meta: {
        slogan: homeContent.company.slogan,
      },
    },
  });
  console.log("✅ Created COMPANY block");

  // 8. Final CTA block
  await prisma.block.create({
    data: {
      pageId: homePage.id,
      type: "CTA",
      key: "final_cta",
      body: homeContent.company.finalCta,
      order: order++,
    },
  });
  console.log("✅ Created CTA block");

  // Create admin user if doesn't exist
  const adminEmail = "admin@reems.com";
  const adminPassword = "Admin123!";

  const existingUser = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingUser) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await prisma.user.create({
      data: {
        email: adminEmail,
        hashedPassword,
        role: "ADMIN",
      },
    });
    console.log(`✅ Created admin user: ${adminEmail}`);
  } else {
    console.log(`ℹ️  Admin user already exists: ${adminEmail}`);
  }

  console.log(`\n🎉 Seed completed! Created ${order} blocks for page "${homePage.slug}"`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seed failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });


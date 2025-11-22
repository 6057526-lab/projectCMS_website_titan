const { PrismaClient } = require('@prisma/client');

const databaseUrl = process.argv[2] || process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('❌ DATABASE_URL не указан');
  process.exit(1);
}

process.env.DATABASE_URL = databaseUrl;

const prisma = new PrismaClient();

async function checkImages() {
  try {
    console.log('🔍 Проверка картинок в базе данных...\n');

    // Проверяем все картинки
    const allImages = await prisma.image.findMany({
      include: {
        block: {
          select: {
            id: true,
            type: true,
            key: true,
            title: true,
          },
        },
      },
    });

    console.log(`📊 Всего картинок в БД: ${allImages.length}\n`);

    if (allImages.length > 0) {
      console.log('Картинки:');
      allImages.forEach((img, idx) => {
        console.log(`\n${idx + 1}. ID: ${img.id}`);
        console.log(`   URL: ${img.url}`);
        console.log(`   Alt: ${img.alt || '(нет описания)'}`);
        console.log(`   Block ID: ${img.blockId || '(не привязана)'}`);
        if (img.block) {
          console.log(`   Блок: ${img.block.type} / ${img.block.key} / "${img.block.title}"`);
        }
      });
    } else {
      console.log('⚠️  Картинки не найдены в базе данных');
    }

    // Проверяем блоки CAPABILITY
    console.log('\n\n🔍 Проверка блоков CAPABILITY...\n');
    const capabilityBlocks = await prisma.block.findMany({
      where: { type: 'CAPABILITY' },
      include: {
        images: true,
      },
      orderBy: { order: 'asc' },
    });

    console.log(`📊 Всего блоков CAPABILITY: ${capabilityBlocks.length}\n`);

    capabilityBlocks.forEach((block, idx) => {
      console.log(`\n${idx + 1}. Блок: ${block.key} / "${block.title}"`);
      console.log(`   ID: ${block.id}`);
      console.log(`   Картинок привязано: ${block.images.length}`);
      if (block.images.length > 0) {
        block.images.forEach((img, imgIdx) => {
          console.log(`     ${imgIdx + 1}. ${img.url}`);
        });
      }
    });

  } catch (error) {
    console.error('❌ Ошибка:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

checkImages();




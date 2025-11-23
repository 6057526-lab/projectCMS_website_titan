import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

// Поддерживаемые форматы изображений
const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".JPG", ".JPEG", ".PNG", ".WEBP"];

async function main() {
  console.log("🔍 Проверка hero изображений в базе данных...\n");

  // Проверяем DATABASE_URL
  if (!process.env.DATABASE_URL) {
    console.error("❌ Ошибка: Не установлена переменная DATABASE_URL");
    console.error("   Установите её в .env.local или через командную строку");
    process.exit(1);
  }

  // 1. Находим hero блок
  const page = await prisma.page.findUnique({
    where: { slug: "home" },
  });

  if (!page) {
    console.error("❌ Страница 'home' не найдена. Запустите seed: npx prisma db seed");
    await prisma.$disconnect();
    process.exit(1);
  }

  const heroBlock = await prisma.block.findUnique({
    where: {
      pageId_key: {
        pageId: page.id,
        key: "hero",
      },
    },
    include: {
      images: {
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!heroBlock) {
    console.error("❌ Блок 'hero' не найден. Запустите seed: npx prisma db seed");
    await prisma.$disconnect();
    process.exit(1);
  }

  console.log(`✅ Найден блок hero (ID: ${heroBlock.id})`);
  console.log(`📊 Изображений в базе: ${heroBlock.images.length}\n`);

  // 2. Получаем список файлов из public/hero
  const heroDir = path.join(process.cwd(), "public", "hero");
  const filesInPublic: string[] = [];

  if (fs.existsSync(heroDir)) {
    const files = fs.readdirSync(heroDir);
    files.forEach((file) => {
      const ext = path.extname(file);
      if (IMAGE_EXTENSIONS.includes(ext)) {
        filesInPublic.push(file);
      }
    });
  } else {
    console.log(`⚠️  Папка ${heroDir} не найдена\n`);
  }

  console.log(`📁 Файлов в public/hero: ${filesInPublic.length}`);
  if (filesInPublic.length > 0) {
    console.log("   Файлы:");
    filesInPublic.forEach((file) => {
      console.log(`   - ${file}`);
    });
  }
  console.log();

  // 3. Показываем изображения из базы
  if (heroBlock.images.length > 0) {
    console.log("🖼️  Изображения в базе данных:");
    console.log("─".repeat(80));
    heroBlock.images.forEach((img, index) => {
      console.log(`\n${index + 1}. ID: ${img.id}`);
      console.log(`   URL: ${img.url}`);
      console.log(`   Alt: ${img.alt || "(не указано)"}`);
      console.log(`   Public ID: ${img.publicId}`);
      console.log(`   Создано: ${img.createdAt.toLocaleString("ru-RU")}`);
    });
  } else {
    console.log("⚠️  В базе данных нет изображений для hero блока");
  }

  console.log("\n" + "=".repeat(80));
  console.log("📊 СРАВНЕНИЕ");
  console.log("=".repeat(80));

  // 4. Сравниваем файлы и записи в БД
  if (filesInPublic.length === 0 && heroBlock.images.length === 0) {
    console.log("⚠️  Нет файлов в public/hero и нет записей в базе данных");
  } else if (filesInPublic.length > 0 && heroBlock.images.length === 0) {
    console.log("❌ Файлы есть в public/hero, но НЕ загружены в базу данных");
    console.log("\n💡 Для загрузки выполните:");
    console.log("   npx tsx scripts/upload-images-to-cloudinary.ts");
  } else if (filesInPublic.length === 0 && heroBlock.images.length > 0) {
    console.log("✅ Изображения загружены в базу данных");
    console.log("ℹ️  Файлов в public/hero нет (возможно, они уже удалены после загрузки)");
  } else {
    console.log(`✅ Файлов в public/hero: ${filesInPublic.length}`);
    console.log(`✅ Изображений в базе: ${heroBlock.images.length}`);
    
    // Пытаемся сопоставить файлы и записи
    const fileNames = new Set(filesInPublic.map(f => path.basename(f, path.extname(f)).toLowerCase()));
    const dbUrls = heroBlock.images.map(img => {
      // Извлекаем имя файла из URL (может быть Cloudinary URL)
      const urlParts = img.url.split('/');
      const fileName = urlParts[urlParts.length - 1].split('.')[0].toLowerCase();
      return fileName;
    });

    console.log("\n📋 Детальное сравнение:");
    filesInPublic.forEach((file) => {
      const baseName = path.basename(file, path.extname(file)).toLowerCase();
      const found = dbUrls.some(url => url.includes(baseName) || baseName.includes(url));
      if (found) {
        console.log(`   ✅ ${file} - найдено в базе`);
      } else {
        console.log(`   ❌ ${file} - НЕ найдено в базе`);
      }
    });
  }

  console.log("\n" + "=".repeat(80));
  console.log("💡 РЕКОМЕНДАЦИИ");
  console.log("=".repeat(80));
  
  if (filesInPublic.length > 0 && heroBlock.images.length === 0) {
    console.log("1. Убедитесь, что настроены переменные Cloudinary в .env.local:");
    console.log("   - CLOUDINARY_CLOUD_NAME");
    console.log("   - CLOUDINARY_API_KEY");
    console.log("   - CLOUDINARY_API_SECRET");
    console.log("\n2. Запустите скрипт загрузки:");
    console.log("   npx tsx scripts/upload-images-to-cloudinary.ts");
  } else if (heroBlock.images.length > 0) {
    console.log("✅ Hero изображения успешно загружены в базу данных!");
    console.log(`   Всего изображений: ${heroBlock.images.length}`);
    console.log("\n💡 Для проверки на сайте:");
    console.log("   1. Запустите dev сервер: npm run dev");
    console.log("   2. Откройте главную страницу");
    console.log("   3. Проверьте, что изображения отображаются в hero секции");
  }

  await prisma.$disconnect();
}

main().catch((error) => {
  console.error("❌ Критическая ошибка:", error);
  process.exit(1);
});


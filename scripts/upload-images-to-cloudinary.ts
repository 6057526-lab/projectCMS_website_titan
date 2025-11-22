import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";
import * as fs from "fs";
import * as path from "path";

// Загружаем переменные окружения из .env.local
const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  try {
    const envFile = fs.readFileSync(envPath, "utf-8");
    const lines = envFile.split(/\r?\n/);
    let loadedCount = 0;
    console.log(`📂 Чтение файла .env.local, найдено ${lines.length} строк`);
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmedLine = line.trim();
      // Отладка: показываем все строки с CLOUDINARY
      if (line.includes("CLOUDINARY")) {
        console.log(`   Строка ${i+1}: "${line}" (trimmed: "${trimmedLine}")`);
      }
      // Пропускаем пустые строки и комментарии
      if (!trimmedLine || trimmedLine.startsWith("#")) {
        continue;
      }
      // Ищем строки вида KEY=VALUE (включая случаи, когда значение может быть пустым)
      const equalIndex = trimmedLine.indexOf("=");
      if (equalIndex > 0) {
        const key = trimmedLine.substring(0, equalIndex).trim();
        let value = trimmedLine.substring(equalIndex + 1).trim();
        // Убираем кавычки если есть
        if ((value.startsWith('"') && value.endsWith('"')) || 
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        // Устанавливаем переменную (перезаписываем, если уже есть)
        if (key) {
          process.env[key] = value;
          loadedCount++;
          // Отладка для Cloudinary переменных
          if (key.includes("CLOUDINARY")) {
            console.log(`   ✓ Загружено: ${key} = "${value.substring(0, Math.min(15, value.length))}${value.length > 15 ? '...' : ''}"`);
          }
        } else {
          // Отладка: почему ключ пустой
          if (trimmedLine.includes("CLOUDINARY")) {
            console.log(`   ⚠ Строка ${i+1} пропущена (пустой ключ после trim): "${trimmedLine}"`);
            console.log(`      Исходная строка: "${line}"`);
            console.log(`      equalIndex: ${equalIndex}, key часть: "${trimmedLine.substring(0, equalIndex)}"`);
          }
        }
      } else {
        // Отладка: почему нет знака =
        if (trimmedLine.includes("CLOUDINARY") && trimmedLine.length > 5) {
          console.log(`   ⚠ Строка ${i+1} пропущена (нет = или = на позиции 0): "${trimmedLine}"`);
          console.log(`      equalIndex: ${equalIndex}, длина: ${trimmedLine.length}`);
        }
      }
    }
  } catch (error) {
    console.warn("⚠️  Не удалось загрузить .env.local:", error);
  }
}

const prisma = new PrismaClient();

// Маппинг файлов к блокам
interface FileMapping {
  folder: string;
  pattern: RegExp;
  blockKey: string;
  category: string;
}

const fileMappings: FileMapping[] = [
  // Hero
  {
    folder: "hero",
    pattern: /^hero-/i,
    blockKey: "hero",
    category: "hero",
  },
  // Capabilities
  {
    folder: "capabilities",
    pattern: /^raw-materials-/i,
    blockKey: "capability_raw_materials",
    category: "capabilities/raw-materials",
  },
  {
    folder: "capabilities",
    pattern: /^forging-/i,
    blockKey: "capability_forging",
    category: "capabilities/forging",
  },
  {
    folder: "capabilities",
    pattern: /^extrusion-/i,
    blockKey: "capability_extrusion_rolling",
    category: "capabilities/extrusion",
  },
  {
    folder: "capabilities",
    pattern: /^machining-/i,
    blockKey: "capability_machining",
    category: "capabilities/machining",
  },
  {
    folder: "capabilities",
    pattern: /^printing-/i,
    blockKey: "capability_printing",
    category: "capabilities/printing",
  },
  {
    folder: "capabilities",
    pattern: /^surface-/i,
    blockKey: "capability_surface_protection",
    category: "capabilities/surface",
  },
  // Market segments
  {
    folder: "market",
    pattern: /^market-automotive-/i,
    blockKey: "market_automotive",
    category: "market/automotive",
  },
  {
    folder: "market",
    pattern: /^market-aerospace-/i,
    blockKey: "market_aerospace",
    category: "market/aerospace",
  },
  {
    folder: "market",
    pattern: /^market-industrial-/i,
    blockKey: "market_industrial",
    category: "market/industrial",
  },
  {
    folder: "market",
    pattern: /^market-special-/i,
    blockKey: "market_special",
    category: "market/special",
  },
  // Forged wheels
  {
    folder: "forged wheels",
    pattern: /^(wheel|wheels)-/i,
    blockKey: "wheels",
    category: "wheels",
  },
];

// Поддерживаемые форматы изображений
const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".JPG", ".JPEG", ".PNG", ".WEBP"];

interface UploadResult {
  success: boolean;
  file: string;
  blockKey?: string;
  url?: string;
  error?: string;
}

async function findBlockByKey(blockKey: string) {
  const page = await prisma.page.findUnique({
    where: { slug: "home" },
  });

  if (!page) {
    throw new Error("Page 'home' not found. Please run seed first.");
  }

  const block = await prisma.block.findUnique({
    where: {
      pageId_key: {
        pageId: page.id,
        key: blockKey,
      },
    },
  });

  return block;
}

function getBlockKeyForFile(filePath: string, folder: string): string | null {
  const fileName = path.basename(filePath);

  for (const mapping of fileMappings) {
    if (mapping.folder === folder && mapping.pattern.test(fileName)) {
      return mapping.blockKey;
    }
  }

  // Fallback для hero (если файл в папке hero, но не соответствует паттерну)
  if (folder === "hero") {
    return "hero";
  }

  // Fallback для forged wheels
  if (folder === "forged wheels") {
    return "wheels";
  }

  return null;
}

function getCategoryForFile(filePath: string, folder: string): string {
  const fileName = path.basename(filePath);

  for (const mapping of fileMappings) {
    if (mapping.folder === folder && mapping.pattern.test(fileName)) {
      return mapping.category;
    }
  }

  return folder;
}

async function uploadFile(
  filePath: string,
  folder: string
): Promise<UploadResult> {
  const fileName = path.basename(filePath);
  const blockKey = getBlockKeyForFile(filePath, folder);
  const category = getCategoryForFile(filePath, folder);

  if (!blockKey) {
    return {
      success: false,
      file: fileName,
      error: `Не удалось определить блок для файла: ${fileName} (папка: ${folder})`,
    };
  }

  try {
    // Проверяем, существует ли блок
    const block = await findBlockByKey(blockKey);
    if (!block) {
      return {
        success: false,
        file: fileName,
        blockKey,
        error: `Блок '${blockKey}' не найден в базе данных. Убедитесь, что seed выполнен.`,
      };
    }

    // Читаем файл
    const fileBuffer = fs.readFileSync(filePath);

    // Загружаем в Cloudinary
    const cloudinaryFolder = `reems/${category}`;
    const uploadResult = await uploadImageToCloudinary(fileBuffer, cloudinaryFolder);

    // Сохраняем в БД
    const image = await prisma.image.create({
      data: {
        url: uploadResult.url,
        publicId: uploadResult.publicId,
        alt: fileName.replace(/\.[^/.]+$/, "").replace(/-/g, " "), // Генерируем alt из имени файла
        blockId: block.id,
      },
    });

    return {
      success: true,
      file: fileName,
      blockKey,
      url: uploadResult.url,
    };
  } catch (error) {
    return {
      success: false,
      file: fileName,
      blockKey,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

function getAllImageFiles(dir: string): string[] {
  const files: string[] = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      // Рекурсивно читаем подпапки
      files.push(...getAllImageFiles(fullPath));
    } else if (item.isFile()) {
      const ext = path.extname(item.name);
      if (IMAGE_EXTENSIONS.includes(ext)) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

async function uploadImageToCloudinary(
  buffer: Buffer,
  folder?: string
): Promise<{ url: string; publicId: string }> {
  return new Promise((resolve, reject) => {
    const uploadOptions: any = {
      resource_type: "image",
    };

    if (folder) {
      uploadOptions.folder = folder;
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        if (!result || !result.secure_url || !result.public_id) {
          reject(new Error("Cloudinary upload failed: missing result data"));
          return;
        }

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    uploadStream.end(buffer);
  });
}

async function main() {
  console.log("🚀 Начинаем загрузку изображений в Cloudinary...\n");


  // Проверяем переменные окружения
  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    console.error(
      "❌ Ошибка: Не установлены переменные окружения Cloudinary"
    );
    console.error(
      "   Убедитесь, что в .env.local есть: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET"
    );
    console.error(
      "   Или установите их через командную строку перед запуском скрипта"
    );
    process.exit(1);
  }

  if (!process.env.DATABASE_URL) {
    console.error("❌ Ошибка: Не установлена переменная DATABASE_URL");
    process.exit(1);
  }

  // Настраиваем Cloudinary
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });

  const publicDir = path.join(process.cwd(), "public");

  if (!fs.existsSync(publicDir)) {
    console.error(`❌ Ошибка: Папка ${publicDir} не найдена`);
    process.exit(1);
  }

  // Получаем все изображения
  const allFiles = getAllImageFiles(publicDir);
  console.log(`📁 Найдено изображений: ${allFiles.length}\n`);

  if (allFiles.length === 0) {
    console.log("⚠️  Изображения не найдены в папке public/");
    await prisma.$disconnect();
    return;
  }

  const results: UploadResult[] = [];
  let successCount = 0;
  let errorCount = 0;

  // Группируем файлы по папкам для лучшего отображения
  const filesByFolder: Record<string, string[]> = {};

  for (const file of allFiles) {
    const relativePath = path.relative(publicDir, file);
    const folder = path.dirname(relativePath).split(path.sep)[0] || "root";
    if (!filesByFolder[folder]) {
      filesByFolder[folder] = [];
    }
    filesByFolder[folder].push(file);
  }

  // Загружаем файлы
  for (const [folder, files] of Object.entries(filesByFolder)) {
    console.log(`\n📂 Папка: ${folder} (${files.length} файлов)`);
    console.log("─".repeat(50));

    for (const file of files) {
      const relativePath = path.relative(publicDir, file);
      const fileFolder = path.dirname(relativePath).split(path.sep)[0] || "root";
      const fileName = path.basename(file);

      process.stdout.write(`  📤 ${fileName}... `);

      const result = await uploadFile(file, fileFolder);
      results.push(result);

      if (result.success) {
        console.log(`✅`);
        console.log(`     → Блок: ${result.blockKey}`);
        console.log(`     → URL: ${result.url}`);
        successCount++;
      } else {
        console.log(`❌`);
        console.log(`     → Ошибка: ${result.error}`);
        errorCount++;
      }
    }
  }

  // Итоговая статистика
  console.log("\n" + "=".repeat(50));
  console.log("📊 ИТОГОВАЯ СТАТИСТИКА");
  console.log("=".repeat(50));
  console.log(`✅ Успешно загружено: ${successCount}`);
  console.log(`❌ Ошибок: ${errorCount}`);
  console.log(`📁 Всего файлов: ${allFiles.length}`);

  if (errorCount > 0) {
    console.log("\n⚠️  Файлы с ошибками:");
    results
      .filter((r) => !r.success)
      .forEach((r) => {
        console.log(`   - ${r.file}: ${r.error}`);
      });
  }

  // Группировка по блокам
  const byBlock: Record<string, number> = {};
  results
    .filter((r) => r.success && r.blockKey)
    .forEach((r) => {
      byBlock[r.blockKey!] = (byBlock[r.blockKey!] || 0) + 1;
    });

  if (Object.keys(byBlock).length > 0) {
    console.log("\n📦 Загружено по блокам:");
    for (const [blockKey, count] of Object.entries(byBlock)) {
      console.log(`   - ${blockKey}: ${count} изображений`);
    }
  }

  await prisma.$disconnect();
}

main().catch((error) => {
  console.error("❌ Критическая ошибка:", error);
  process.exit(1);
});


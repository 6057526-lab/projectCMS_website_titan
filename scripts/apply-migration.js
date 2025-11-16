#!/usr/bin/env node

/**
 * Скрипт для применения миграции Prisma к базе данных
 * Использование:
 *   node scripts/apply-migration.js DATABASE_URL
 * или
 *   DATABASE_URL=your-url node scripts/apply-migration.js
 */

const { execSync } = require('child_process');
const path = require('path');

// Получаем DATABASE_URL из аргументов командной строки или переменной окружения
const databaseUrl = process.argv[2] || process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('❌ Ошибка: DATABASE_URL не указан');
  console.log('\nИспользование:');
  console.log('  node scripts/apply-migration.js <DATABASE_URL>');
  console.log('  или');
  console.log('  DATABASE_URL=<url> node scripts/apply-migration.js');
  process.exit(1);
}

console.log('🚀 Применение миграции Prisma...\n');
console.log('DATABASE_URL:', databaseUrl.replace(/:[^:@]+@/, ':****@')); // Скрываем пароль в выводе
console.log('');

try {
  // Устанавливаем DATABASE_URL для команды
  process.env.DATABASE_URL = databaseUrl;

  // Запускаем prisma migrate deploy
  execSync('npx prisma migrate deploy', {
    stdio: 'inherit',
    cwd: path.resolve(__dirname, '..'),
    env: {
      ...process.env,
      DATABASE_URL: databaseUrl,
    },
  });

  console.log('\n✅ Миграция успешно применена!');
} catch (error) {
  console.error('\n❌ Ошибка при применении миграции:', error.message);
  process.exit(1);
}


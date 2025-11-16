# Настройка базы данных

## Быстрый старт

### 1. Настройте PostgreSQL

Вам нужна база данных PostgreSQL. Варианты:

**Локально (Windows):**
- Установите PostgreSQL: https://www.postgresql.org/download/windows/
- Или используйте Docker: `docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres`

**В облаке:**
- Railway: https://railway.app/ (бесплатный tier)
- Supabase: https://supabase.com/ (бесплатный tier)
- Neon: https://neon.tech/ (бесплатный tier)

### 2. Настройте переменные окружения

Файл `.env.local` уже создан. Обновите `DATABASE_URL` под вашу БД:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

**Примеры:**

Локально:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/reems_cms?schema=public"
```

Railway (после создания PostgreSQL сервиса):
```env
DATABASE_URL="postgresql://postgres:xxx@containers-us-west-xxx.railway.app:5432/railway"
```

### 3. Запустите миграции

Создайте таблицы в базе данных:

```bash
npx prisma migrate dev
```

Эта команда:
- Создаст миграцию на основе `prisma/schema.prisma`
- Применит её к БД
- Сгенерирует Prisma Client

### 4. Заполните БД данными

Перенесите контент из `app/content/homeContent.ts` в базу:

```bash
npx prisma db seed
```

Вы должны увидеть:
```
🌱 Starting seed...
✅ Created page: REEMS — Race & Engineering Elite Manufacturing Services (slug: home)
✅ Created HERO block
✅ Created INTRO block
...
🎉 Seed completed! Created 23 blocks for page "home"
```

### 5. Запустите приложение

```bash
npm run dev
```

Откройте http://localhost:3000 — страница теперь читает данные из БД!

## Полезные команды

### Prisma Studio (GUI для БД)

Откройте визуальный редактор базы данных:

```bash
npx prisma studio
```

Это откроет http://localhost:5555 где вы можете:
- Просматривать все таблицы
- Редактировать записи
- Удалять данные
- Добавлять новые записи

### Пересоздать данные

Если хотите очистить БД и заполнить заново:

```bash
npx prisma migrate reset
```

Эта команда:
- Удалит все данные
- Пересоздаст таблицы
- Автоматически запустит seed

### Изменить схему БД

1. Отредактируйте `prisma/schema.prisma`
2. Создайте миграцию:
   ```bash
   npm run prisma:migrate
   ```
3. Prisma Client обновится автоматически

## Структура данных

### Page (Страница)

```typescript
{
  id: "clxxx...",
  slug: "home",
  title: "REEMS — Race & Engineering Elite Manufacturing Services",
  blocks: [...], // связанные блоки
  createdAt: "2024-...",
  updatedAt: "2024-..."
}
```

### Block (Блок контента)

```typescript
{
  id: "clxxx...",
  type: "HERO" | "MARKET_SEGMENT" | "LIFECYCLE_STAGE" | ...,
  key: "hero", // уникальный ключ блока
  title: "Race & Engineering Elite Manufacturing Services",
  subtitle: "Advanced magnesium, aluminium...",
  body: "REEMS combines engineering...",
  bullets: ["Item 1", "Item 2"], // JSON
  meta: { buttons: { primary: "...", secondary: "..." } }, // JSON
  order: 0, // порядок на странице
  ...
}
```

### Типы блоков (BlockType)

- `HERO` — главный баннер
- `INTRO` — вступительная секция
- `MARKET_SEGMENT` — сегмент рынка
- `LIFECYCLE_INTRO` — вступление к lifecycle
- `LIFECYCLE_STAGE` — этап жизненного цикла
- `CAPABILITY` — возможность/технология
- `WHEELS` — секция про колеса
- `COMPANY` — о компании
- `CTA` — призыв к действию

## Как работает рендеринг

1. **app/page.tsx** (серверный компонент):
   ```typescript
   const page = await prisma.page.findUnique({
     where: { slug: "home" },
     include: { blocks: true }
   });
   ```

2. **lib/adapters.ts** преобразует блоки:
   ```typescript
   const heroAndIntro = adaptHeroAndIntro(page.blocks);
   // { hero: { headline, subheadline, ... }, intro: { text, bullets, ... } }
   ```

3. **Компоненты** получают пропсы:
   ```typescript
   <HeroBanner hero={heroAndIntro.hero} intro={heroAndIntro.intro} />
   ```

## Production (Railway / Vercel)

1. Создайте PostgreSQL базу на платформе
2. Добавьте `DATABASE_URL` в environment variables
3. В build command добавьте миграции:
   ```bash
   npx prisma migrate deploy && npm run build
   ```
4. После деплоя запустите seed (один раз):
   ```bash
   npm run prisma:seed
   ```

## Troubleshooting

### Ошибка "Can't reach database server"

- Проверьте, что PostgreSQL запущен
- Проверьте DATABASE_URL (хост, порт, логин, пароль)
- Проверьте файрвол (порт 5432 должен быть открыт)

### Ошибка "Environment variable not found: DATABASE_URL"

- Создайте файл `.env.local` в корне проекта
- Добавьте `DATABASE_URL=...`

### Страница показывает "Page Not Found"

- БД не заполнена. Запустите: `npx prisma db seed`

### После изменения schema.prisma TypeScript ругается

- Запустите: `npx prisma generate`
- Перезапустите TypeScript сервер в IDE

---

**Готово!** Теперь у вас есть полноценная база данных для CMS. Следующий шаг — создание админ-панели для редактирования контента через UI.


# Сводка: Миграция на базу данных

## Что было сделано

### ✅ 1. Настройка Prisma + PostgreSQL

**Установлено:**
- `@prisma/client` — клиент для работы с БД
- `prisma` — CLI для миграций
- `tsx` — для запуска TypeScript seed-скрипта

**Создано:**
- `prisma/schema.prisma` — схема базы данных
- `.env.local` — переменные окружения (DATABASE_URL)

### ✅ 2. Модели данных

**Созданы две модели:**

**Page** — страница сайта:
```prisma
model Page {
  id        String   @id @default(cuid())
  slug      String   @unique      // "home"
  title     String
  blocks    Block[]               // связь 1:N
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

**Block** — блок контента на странице:
```prisma
model Block {
  id        String    @id @default(cuid())
  pageId    String
  type      BlockType              // enum: HERO, MARKET_SEGMENT, etc.
  key       String                 // уникальный ключ: "hero", "market_automotive"
  title     String?
  subtitle  String?
  body      String?                // основной текст
  order     Int                    // порядок на странице
  bullets   Json?                  // массив строк
  meta      Json?                  // доп. настройки (кнопки, фото и т.д.)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  
  @@unique([pageId, key])
  @@index([pageId, order])
}
```

**BlockType enum:**
- `HERO` — главный баннер
- `INTRO` — вступительная секция  
- `MARKET_SEGMENT` — сегмент рынка
- `LIFECYCLE_INTRO` — вступление к lifecycle
- `LIFECYCLE_STAGE` — этап жизненного цикла
- `CAPABILITY` — технология/возможность
- `WHEELS` — секция про колеса
- `COMPANY` — о компании
- `CTA` — призыв к действию

### ✅ 3. Seed-скрипт

**Файл:** `prisma/seed.ts`

Переносит весь контент из `app/content/homeContent.ts` в базу данных:
- Создает страницу "home"
- Создает ~23 блока контента
- Сохраняет bullets и meta в JSON поля
- Выставляет правильный order для корректного порядка отображения

**Маппинг контента:**
- `hero` → Block { type: HERO, key: "hero" }
- `intro` → Block { type: INTRO, key: "intro" }
- `marketSegments.segments[]` → Block[] { type: MARKET_SEGMENT }
- `lifecycle.phases[]` → Block[] { type: LIFECYCLE_STAGE }
- `capabilities.items[]` → Block[] { type: CAPABILITY }
- `forgedWheels` → Block { type: WHEELS }
- `company` → Block { type: COMPANY }
- `company.finalCta` → Block { type: CTA }

### ✅ 4. Prisma Client (Singleton)

**Файл:** `lib/db.ts`

Создан singleton паттерн для Prisma Client:
- Предотвращает множественные подключения в dev режиме
- Логирование запросов в development
- Правильная работа с Next.js hot reload

### ✅ 5. Адаптеры данных

**Файл:** `lib/adapters.ts`

Функции-адаптеры преобразуют Block[] из БД в пропсы компонентов:
- `adaptHeroAndIntro()` — для HeroBanner
- `adaptMarketSegments()` — для MarketSegments
- `adaptLifecycle()` — для FullProductLifecycle
- `adaptCapabilities()` — для Capabilities
- `adaptForgedWheels()` — для ForgedWheelsSection
- `adaptCompany()` — для CompanySection

Эти функции:
- Находят нужные блоки по type и key
- Извлекают данные из JSON полей (bullets, meta)
- Формируют объекты в формате, ожидаемом компонентами

### ✅ 6. Обновление компонентов

Все компоненты переделаны на props вместо прямого импорта `homeContent`:

**До:**
```typescript
import { homeContent } from "../content/homeContent";
export default function HeroBanner() {
  const { hero, intro } = homeContent;
```

**После:**
```typescript
interface HeroBannerProps {
  hero: { headline: string; ... };
  intro: { text: string; ... };
}
export default function HeroBanner({ hero, intro }: HeroBannerProps) {
```

**Обновлены компоненты:**
- HeroBanner
- MarketSegments
- FullProductLifecycle
- Capabilities
- ForgedWheelsSection
- CompanySection

### ✅ 7. Главная страница (app/page.tsx)

Переделана в **async серверный компонент**:

```typescript
export default async function Home() {
  // Получаем данные из БД
  const page = await prisma.page.findUnique({
    where: { slug: "home" },
    include: { blocks: { orderBy: { order: "asc" } } }
  });
  
  // Адаптируем для компонентов
  const heroAndIntro = adaptHeroAndIntro(page.blocks);
  const marketSegments = adaptMarketSegments(page.blocks);
  // ...
  
  // Передаем как props
  return (
    <>
      <HeroBanner hero={heroAndIntro.hero} intro={heroAndIntro.intro} />
      <MarketSegments marketSegments={marketSegments} />
      {/* ... */}
    </>
  );
}
```

**Преимущества:**
- ✅ Данные загружаются на сервере (SSR)
- ✅ Всегда свежие данные из БД
- ✅ SEO-friendly (контент в HTML)
- ✅ Нет client-side запросов

### ✅ 8. package.json скрипты

Добавлены удобные команды:

```json
{
  "scripts": {
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:seed": "tsx prisma/seed.ts"
  },
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

### ✅ 9. Документация

Обновлены файлы:
- **README.md** — добавлены секции про БД, Prisma, deployment
- **DATABASE_SETUP.md** — подробная инструкция по настройке БД

## Файловая структура

```
projectCMS_website_titan/
├── app/
│   ├── components/          # React компоненты (теперь принимают props)
│   ├── content/
│   │   └── homeContent.ts   # Источник данных (только для seed)
│   └── page.tsx             # Главная страница (читает из БД)
├── lib/
│   ├── db.ts                # Prisma client singleton
│   └── adapters.ts          # Адаптеры Block[] → props
├── prisma/
│   ├── schema.prisma        # Схема БД (Page, Block)
│   └── seed.ts              # Скрипт заполнения БД
├── .env.local               # DATABASE_URL (не в git)
├── DATABASE_SETUP.md        # Инструкция по настройке БД
└── package.json             # Новые скрипты для Prisma
```

## Что изменилось в архитектуре

### Раньше:
```
homeContent.ts (статический файл)
         ↓
   Компоненты (прямой импорт)
         ↓
      Рендер
```

### Сейчас:
```
homeContent.ts
      ↓
   seed.ts → PostgreSQL (Page + Blocks)
                ↓
          app/page.tsx (Prisma query)
                ↓
         lib/adapters.ts
                ↓
           Компоненты (props)
                ↓
              Рендер
```

## Следующие шаги

Текущая реализация — это **фундамент для CMS**. Следующие возможные этапы:

1. **CMS Admin Panel**
   - Создать `/admin` роут
   - UI для редактирования Page и Block
   - CRUD операции через API routes

2. **Аутентификация**
   - Добавить модель User
   - NextAuth.js или Clerk
   - Роли (admin, editor)

3. **Media Management**
   - Интеграция Cloudinary
   - Модель Media
   - Связь Block → Media (для фото)

4. **Версионирование**
   - История изменений блоков
   - Drafts/Published статусы
   - Preview режим

5. **Мультиязычность**
   - i18n support
   - Переводы в отдельных таблицах

## Как протестировать

1. Убедитесь, что PostgreSQL запущен
2. Настройте DATABASE_URL в `.env.local`
3. Запустите миграции: `npx prisma migrate dev`
4. Заполните БД: `npx prisma db seed`
5. Запустите dev server: `npm run dev`
6. Откройте http://localhost:3000

**Результат:** Страница должна выглядеть точно так же, как раньше, но контент теперь читается из базы данных!

Для проверки данных используйте Prisma Studio:
```bash
npx prisma studio
```

## Технические детали

### Server Components vs Client Components

Все компоненты остались серверными (по умолчанию в app router):
- Данные загружаются на сервере
- Нет client-side JavaScript для данных
- Лучше для SEO и производительности

### JSON поля

`bullets` и `meta` хранятся как JSON:
- Гибкость для разных типов блоков
- Легко добавлять новые поля
- Prisma автоматически парсит JSON

### Индексы БД

```prisma
@@unique([pageId, key])  // Уникальность ключа внутри страницы
@@index([pageId, order]) // Быстрая сортировка блоков
```

Это обеспечивает:
- Быстрые запросы
- Целостность данных
- Уникальность ключей блоков

---

**Статус:** ✅ Полностью готово к использованию

**Версия:** 1.0 - Database Integration
**Дата:** Ноябрь 2024


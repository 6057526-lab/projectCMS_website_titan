# REEMS Landing Page

Race & Engineering Elite Manufacturing Services — Professional B2B landing page for advanced light-alloy manufacturing solutions.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

## 🚀 Technology Stack

- **Next.js 14** with App Router
- **React 18**
- **TypeScript** (strict mode)
- **Tailwind CSS** for styling
- **Prisma** + **PostgreSQL** for content management
- Database-driven content architecture (CMS foundation)

## Project Structure

```
projectCMS_website_titan/
├── app/
│   ├── components/          # React components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroBanner.tsx
│   │   ├── MarketSegments.tsx
│   │   ├── FullProductLifecycle.tsx
│   │   ├── Capabilities.tsx
│   │   ├── ForgedWheelsSection.tsx
│   │   ├── CompanySection.tsx
│   │   └── CallToActionSection.tsx
│   ├── content/             # Static content (used for seeding)
│   │   └── homeContent.ts   # Typed content data
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page (reads from DB)
│   └── globals.css          # Global styles
├── lib/
│   ├── db.ts                # Prisma client singleton
│   └── adapters.ts          # DB to component adapters
├── prisma/
│   ├── schema.prisma        # Database schema (Page/Block models)
│   └── seed.ts              # Database seeding script
├── public/                  # Static assets (future images)
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database (local or cloud)

### Installation

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
JWT_SECRET="your-secret-key-here-minimum-32-characters-long"
```

Replace with your actual PostgreSQL credentials. For local development:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/reems_cms?schema=public"
JWT_SECRET="dev-secret-key-change-in-production-minimum-32-chars"
```

**Important**: Generate a strong random JWT_SECRET for production. You can use:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

3. Run database migrations:

```bash
npx prisma migrate dev
```

This will create the database schema (Page and Block models).

4. Seed the database with initial content:

```bash
npx prisma db seed
```

This will populate the database with:
- Content from `app/content/homeContent.ts`
- Admin user with default credentials (see Admin CMS section below)

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Database Commands

- **Generate Prisma Client** (after schema changes):
  ```bash
  npm run prisma:generate
  ```

- **Create migration** (after schema changes):
  ```bash
  npm run prisma:migrate
  ```

- **Seed database**:
  ```bash
  npm run prisma:seed
  ```

- **Open Prisma Studio** (database GUI):
  ```bash
  npx prisma studio
  ```

### Build for Production

Build the optimized production bundle:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Features

- ✅ Fully responsive design (desktop, tablet, mobile)
- ✅ Clean industrial B2B aesthetic
- ✅ Smooth scroll navigation with anchor links
- ✅ Type-safe content management
- ✅ Modular component architecture
- ✅ **CMS Admin Panel** with authentication
- ✅ **Content editing interface** for text blocks
- ✅ Protected admin routes with JWT authentication
- ✅ Contact form (frontend only, backend integration needed)

## Admin CMS

### Authentication

The system includes a secure admin panel for managing content. After running the seed script, you can log in with:

**Default Admin Credentials:**
- **Email**: `admin@reems.com`
- **Password**: `Admin123!`

⚠️ **Important**: Change the default password in production!

### Admin Routes

- **`/admin/login`** - Login page
- **`/admin/page-list`** - List of all pages in the system
- **`/admin/pages/[slug]`** - Edit blocks for a specific page (e.g., `/admin/pages/home`)

### Features

- ✅ Secure JWT-based authentication
- ✅ HTTP-only cookies for session management
- ✅ Protected routes with middleware
- ✅ Edit text content (title, subtitle, body, bullets)
- ✅ Real-time content updates
- ✅ Simple, intuitive editing interface

### How to Use

1. **Run the seed script** to create the admin user:
   ```bash
   npm run prisma:seed
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Navigate to the admin panel**:
   - Open [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
   - Log in with the default credentials above

4. **Edit content**:
   - Go to "Pages" to see all available pages
   - Click "Edit" on a page to modify its content blocks
   - Each block shows its type (HERO, MARKET_SEGMENT, etc.) and key
   - Edit text fields and click "Save"
   - Changes are immediately visible on the public website

### Current Limitations

This initial CMS version focuses on text content only:
- ✅ Edit title, subtitle, body, and bullet points
- ❌ Image uploads (planned for future)
- ❌ Creating/deleting blocks (planned for future)
- ❌ User management (planned for future)
- ❌ Rich text editor (planned for future)

## Content Management

### Database-Driven Architecture

Content is now stored in a PostgreSQL database using Prisma ORM. The system uses two core models:

- **Page**: Represents a page (e.g., "home")
- **Block**: Represents content blocks on a page (hero, market segments, capabilities, etc.)

#### Database Models

```prisma
model Page {
  id        String   @id @default(cuid())
  slug      String   @unique
  title     String
  blocks    Block[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Block {
  id        String    @id @default(cuid())
  type      BlockType // HERO, MARKET_SEGMENT, LIFECYCLE_STAGE, etc.
  key       String    // unique identifier within page
  title     String?
  subtitle  String?
  body      String?
  bullets   Json?     // array of bullet points
  meta      Json?     // additional settings (buttons, photos, etc.)
  order     Int       // display order
  ...
}
```

#### Content Flow

1. **Source**: Original content is in `app/content/homeContent.ts` (TypeScript)
2. **Seed**: Run `npx prisma db seed` to transfer content to database
3. **Render**: Home page fetches data from database via Prisma
4. **Adapters**: `lib/adapters.ts` transforms database blocks into component props

#### Benefits

- ✅ Content stored separately from code
- ✅ Foundation for future CMS admin panel
- ✅ Easy to extend with new block types
- ✅ Type-safe database queries with Prisma
- ✅ Server-side rendering with fresh data on each request

## Design System

### Colors

- **Primary**: Blue (`#1e40af`) - used for CTAs and accents
- **Background**: Light gray (`#f9fafb`)
- **Text**: Dark gray (`#111827`)

### Typography

- Headings: Bold, large sizes for hierarchy
- Body: Clean, readable line heights
- Industrial, professional aesthetic

## Deployment

### Railway

Подробная инструкция по деплою на Railway находится в файле [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md)

**Краткий чек-лист:**

1. ✅ Загрузите проект в Git репозиторий (GitHub/GitLab)
2. ✅ Создайте проект на Railway и подключите репозиторий
3. ✅ Создайте PostgreSQL базу данных в Railway
4. ✅ Добавьте переменные окружения (см. ниже)
5. ✅ Запустите миграции: `railway run npx prisma migrate deploy`
6. ✅ Запустите seed: `railway run npm run prisma:seed`
7. ✅ Измените пароль администратора после первого входа

### Environment Variables для Railway

**Обязательные переменные:**

```env
# База данных (Railway автоматически создает при добавлении PostgreSQL)
DATABASE_URL=postgresql://user:password@host:port/database?schema=public

# JWT секрет (сгенерируйте случайную строку минимум 32 символа)
# Генерация: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=your-random-secret-key-minimum-32-characters

# Окружение
NODE_ENV=production
```

**Где добавить в Railway:**
- Railway Dashboard → Ваш проект → Settings → Variables
- Или: Railway Dashboard → Ваш проект → PostgreSQL сервис → Variables (для DATABASE_URL)

### Другие платформы (Vercel, etc.)

1. Set up PostgreSQL database on your platform
2. Add environment variables (see above)
3. Run migrations: `npx prisma migrate deploy`
4. Seed database: `npm run prisma:seed`
5. Deploy

**Security Notes:**
- Use a strong, random JWT_SECRET (at least 32 characters)
- Never commit `.env` files to version control
- Change default admin password after first login

## Future Enhancements

- [x] Database-driven content (Prisma + PostgreSQL)
- [x] Content block architecture
- [x] **CMS Admin Panel (edit content via UI)**
- [x] **User authentication and roles**
- [ ] Add image management (Cloudinary integration)
- [ ] Implement contact form backend
- [ ] Add animations and transitions
- [ ] SEO optimization
- [ ] Analytics integration
- [ ] Multi-language support
- [ ] Page versioning and drafts

## License

Proprietary - REEMS

---

Built with ❤️ for high-performance manufacturing


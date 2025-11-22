# Project Structure Overview

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript (strict mode)
- **UI**: React 18
- **Styling**: Tailwind CSS
- **Build**: Webpack (via Next.js)

## Directory Structure

```
projectCMS_website_titan/
│
├── app/                          # Next.js App Router directory
│   ├── components/               # React components
│   │   ├── Header.tsx           # Site header with navigation
│   │   ├── Footer.tsx           # Site footer
│   │   ├── HeroBanner.tsx       # Hero section with CTA
│   │   ├── MarketSegments.tsx   # Market segments grid
│   │   ├── FullProductLifecycle.tsx  # Lifecycle phases
│   │   ├── Capabilities.tsx     # Technologies showcase
│   │   ├── ForgedWheelsSection.tsx   # Wheels section
│   │   ├── CompanySection.tsx   # Company info
│   │   └── CallToActionSection.tsx   # Contact form
│   │
│   ├── content/                 # Content management
│   │   └── homeContent.ts       # Typed static content
│   │
│   ├── layout.tsx               # Root layout (includes Header/Footer)
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles + Tailwind
│
├── public/                       # Static assets (images, etc.)
│
├── next.config.js               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── postcss.config.js            # PostCSS configuration
├── package.json                 # Dependencies and scripts
│
├── README.md                    # Getting started guide
├── DEPLOYMENT.md                # Deployment instructions
└── PROJECT_STRUCTURE.md         # This file
```

## Key Files Explained

### Content Management

**`app/content/homeContent.ts`**
- Single source of truth for all text content
- Fully typed with TypeScript interfaces
- Easy to migrate to CMS or database
- Organized by section

### Components

All components are:
- Functional React components
- Fully typed with TypeScript
- Import content from `homeContent.ts`
- Responsive (mobile-first design)
- Self-contained and reusable

### Styling

**`app/globals.css`**
- Tailwind base, components, utilities
- Custom utility classes (`.container-custom`, `.btn-primary`, etc.)
- Consistent spacing and colors

**`tailwind.config.ts`**
- Custom color palette (primary blue)
- Container max-width (1200px)
- Extended theme configuration

## Content Structure

The content is organized into these main sections:

1. **Hero Banner** - Main headline, subheadline, CTAs
2. **Intro** - Company overview with bullet points
3. **Market Segments** - 4 industry verticals (Automotive, Aerospace, Industrial, Special)
4. **Full Product Lifecycle** - 4 phases (R&D, Engineering, Production, Testing)
5. **Capabilities** - 6 technology areas (Raw materials, Forging, Extrusion, Machining, 3D Printing, Surface Protection)
6. **Forged Wheels** - Dedicated wheels section
7. **Company** - About REEMS
8. **Call to Action** - Contact form

## Design System

### Colors
- **Primary**: `#1e40af` (blue-800) - CTAs, headings, accents
- **Background**: `#f9fafb` (gray-50) - main background
- **Text**: `#111827` (gray-900) - body text
- **Secondary**: Various gray shades for hierarchy

### Typography
- **Headings**: Bold, large (3xl to 6xl)
- **Body**: Regular, readable (base to lg)
- **Line height**: Relaxed for readability

### Layout
- **Container**: Max-width 1200px, centered
- **Padding**: Consistent horizontal (px-6, lg:px-8)
- **Sections**: Vertical padding (py-16, lg:py-24)
- **Grid**: Responsive (1/2/4 columns based on screen size)

## Future Enhancements

### Ready for CMS Integration
The current structure makes it easy to:
1. Replace `homeContent.ts` with API calls
2. Add dynamic routing for pages
3. Implement image management (Cloudinary, etc.)
4. Add multi-language support

### Database Schema (Future)
When migrating to a database, the content types in `homeContent.ts` can directly map to database tables:
- `HeroBanner` → `hero_banners` table
- `MarketSegmentCard` → `market_segments` table
- `CapabilityItem` → `capabilities` table
- etc.

## Development Workflow

1. **Content Updates**: Edit `app/content/homeContent.ts`
2. **Styling Changes**: Modify Tailwind classes or `globals.css`
3. **New Components**: Add to `app/components/`
4. **New Pages**: Add to `app/` directory
5. **Testing**: Run `npm run dev` and check `localhost:3000`
6. **Build**: Run `npm run build` before deployment

## Performance

- Static generation (SSG) for all pages
- Minimal JavaScript bundle (~87 KB)
- Fast page loads
- SEO-friendly

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive
- Tablet optimized




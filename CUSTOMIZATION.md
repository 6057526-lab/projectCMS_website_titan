# Customization Guide

This guide explains how to customize the REEMS landing page to fit your needs.

## Content Updates

### Updating Text Content

All text content is centralized in `app/content/homeContent.ts`. This file contains typed objects for each section.

**Example: Updating the hero headline**

```typescript
// app/content/homeContent.ts
export const homeContent: HomeContent = {
  hero: {
    headline: "Your New Headline Here",
    subheadline: "Your new subheadline...",
    // ...
  },
  // ...
}
```

### Adding New Market Segments

```typescript
// app/content/homeContent.ts
marketSegments: {
  segments: [
    // ... existing segments
    {
      title: "New Industry",
      leadText: "Description of this new industry vertical...",
      bullets: [
        "Feature 1",
        "Feature 2",
        "Feature 3",
      ],
    },
  ],
}
```

## Design Customization

### Changing Colors

Edit `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: "#your-color", // Main brand color
        light: "#lighter-shade",
        dark: "#darker-shade",
      },
      // Add more custom colors
      secondary: {
        DEFAULT: "#another-color",
      },
    },
  },
}
```

**Using custom colors in components:**

```tsx
<div className="bg-primary text-white">
  <h1 className="text-secondary">Heading</h1>
</div>
```

### Changing Typography

**Font Family**

1. Import font in `app/layout.tsx`:

```tsx
import { Inter, Roboto } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
```

2. Apply to body:

```tsx
<body className={inter.className}>
```

**Font Sizes**

Edit `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    fontSize: {
      'huge': '5rem',
      'tiny': '0.625rem',
    },
  },
}
```

### Adjusting Layout

**Container Width**

```typescript
// tailwind.config.ts
theme: {
  extend: {
    maxWidth: {
      container: "1400px", // Change from 1200px
    },
  },
}
```

**Section Spacing**

```css
/* app/globals.css */
.section-padding {
  @apply py-20 lg:py-32; /* Increase from py-16 lg:py-24 */
}
```

## Component Customization

### Modifying the Header

**Adding New Menu Items**

```tsx
// app/components/Header.tsx
const menuItems = [
  // ... existing items
  { label: "New Page", href: "#new-section" },
];
```

**Changing Header Style**

```tsx
// app/components/Header.tsx
<header className="bg-gray-900 text-white shadow-lg"> {/* Dark header */}
```

### Customizing Buttons

**Global Button Styles**

```css
/* app/globals.css */
.btn-primary {
  @apply inline-block px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-bold rounded-lg hover:shadow-xl transition-all duration-300;
}
```

**Component-Specific Buttons**

```tsx
<button className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700">
  Custom Button
</button>
```

### Adding Animations

**Install Tailwind Animate Plugin**

```bash
npm install -D @tailwindcss/forms @tailwindcss/typography
```

**Add to config:**

```typescript
// tailwind.config.ts
plugins: [
  require('@tailwindcss/forms'),
  require('@tailwindcss/typography'),
],
```

**Use in components:**

```tsx
<div className="animate-fade-in">
  <h1 className="animate-slide-up">Animated Heading</h1>
</div>
```

## Adding New Sections

### Step 1: Define Content Type

```typescript
// app/content/homeContent.ts
export interface NewSection {
  title: string;
  items: string[];
}

export interface HomeContent {
  // ... existing
  newSection: NewSection;
}

export const homeContent: HomeContent = {
  // ... existing
  newSection: {
    title: "New Section Title",
    items: ["Item 1", "Item 2"],
  },
}
```

### Step 2: Create Component

```tsx
// app/components/NewSection.tsx
import { homeContent } from "../content/homeContent";

export default function NewSection() {
  const { newSection } = homeContent;

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <h2 className="text-4xl font-bold mb-8">{newSection.title}</h2>
        <ul>
          {newSection.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

### Step 3: Add to Page

```tsx
// app/page.tsx
import NewSection from "./components/NewSection";

export default function Home() {
  return (
    <>
      {/* ... existing sections */}
      <NewSection />
    </>
  );
}
```

## Responsive Design

### Breakpoints

Tailwind CSS breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

**Example usage:**

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* 1 column on mobile, 2 on tablet, 4 on desktop */}
</div>
```

### Mobile-First Approach

Always design for mobile first, then add larger breakpoints:

```tsx
<h1 className="text-2xl md:text-4xl lg:text-6xl">
  {/* Small on mobile, larger on desktop */}
</h1>
```

## Advanced Customization

### Adding Dark Mode

1. Enable in Tailwind config:

```typescript
// tailwind.config.ts
module.exports = {
  darkMode: 'class', // or 'media'
  // ...
}
```

2. Use dark variants:

```tsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
```

### Custom Gradients

```typescript
// tailwind.config.ts
theme: {
  extend: {
    backgroundImage: {
      'hero-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
  },
}
```

```tsx
<div className="bg-hero-gradient">
```

### Adding Icons

**Install Heroicons:**

```bash
npm install @heroicons/react
```

**Use in components:**

```tsx
import { CheckIcon } from '@heroicons/react/24/solid'

<CheckIcon className="w-6 h-6 text-primary" />
```

## Performance Optimization

### Image Optimization

When adding images, use Next.js Image component:

```tsx
import Image from 'next/image'

<Image
  src="/your-image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority // for above-the-fold images
/>
```

### Code Splitting

Next.js automatically code-splits by route. For component-level splitting:

```tsx
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
})
```

## SEO Customization

### Page Metadata

```tsx
// app/page.tsx
export const metadata = {
  title: 'Custom Page Title',
  description: 'Custom description',
  keywords: ['keyword1', 'keyword2'],
}
```

### Open Graph Tags

```tsx
// app/layout.tsx
export const metadata = {
  openGraph: {
    title: 'REEMS',
    description: 'Advanced manufacturing',
    images: ['/og-image.jpg'],
  },
}
```

## Tips & Best Practices

1. **Keep content in `homeContent.ts`** - Don't hardcode text in components
2. **Use Tailwind utilities** - Avoid custom CSS when possible
3. **Test responsive design** - Check mobile, tablet, desktop
4. **Maintain type safety** - Always update TypeScript interfaces
5. **Optimize images** - Compress before adding to `public/`
6. **Test builds** - Run `npm run build` before deploying

## Need More Help?

- Check `PROJECT_STRUCTURE.md` for architecture overview
- See `QUICK_START.md` for basic commands
- Read `DEPLOYMENT.md` for deployment options




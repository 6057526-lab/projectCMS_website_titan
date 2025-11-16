# Quick Start Guide

## Installation

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

Create production build:

```bash
npm run build
```

## Start Production Server

```bash
npm start
```

## Project Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (hot reload) |
| `npm run build` | Build for production |
| `npm start` | Start production server |

## Editing Content

All content is in `app/content/homeContent.ts`. Edit this file to update:
- Headlines and descriptions
- Market segments
- Capabilities
- Company information
- All other text

## Adding Images

1. Place images in `public/` folder
2. Reference them in components: `/image-name.jpg`
3. Use Next.js `<Image>` component for optimization (future enhancement)

## Customizing Design

### Colors
Edit `tailwind.config.ts` to change the primary color:

```typescript
colors: {
  primary: {
    DEFAULT: "#1e40af", // Change this
    light: "#3b82f6",
    dark: "#1e3a8a",
  },
}
```

### Layout
Edit `app/globals.css` to adjust:
- Container width
- Section padding
- Button styles

## Adding New Sections

1. Create component in `app/components/YourSection.tsx`
2. Add content to `app/content/homeContent.ts`
3. Import and use in `app/page.tsx`

## Troubleshooting

**Port already in use?**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
npm run dev -- -p 3001
```

**Build errors?**
- Check TypeScript errors: `npx tsc --noEmit`
- Clear Next.js cache: `rm -rf .next`

**Styling not updating?**
- Restart dev server
- Check Tailwind class names are correct
- Ensure `globals.css` is imported in `layout.tsx`

## Need Help?

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)


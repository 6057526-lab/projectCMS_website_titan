# Deployment Guide

## Vercel Deployment (Recommended)

The easiest way to deploy this Next.js application is using [Vercel](https://vercel.com):

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository to Vercel
3. Vercel will automatically detect Next.js and configure the build settings
4. Click "Deploy"

### Environment Variables

When deploying, you may want to set:
- `NEXT_PUBLIC_SITE_URL` - Your production URL

## Alternative Deployment Options

### Docker

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

### Static Export

For static hosting (GitHub Pages, Netlify, etc.):

1. Update `next.config.js`:
```js
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}
```

2. Build:
```bash
npm run build
```

3. Deploy the `out/` directory

## Performance Optimization

- Enable image optimization when adding images
- Consider using a CDN for static assets
- Enable compression in your hosting provider
- Monitor Core Web Vitals

## Post-Deployment Checklist

- [ ] Test all navigation links
- [ ] Verify responsive design on mobile devices
- [ ] Test contact form (when backend is connected)
- [ ] Check page load performance
- [ ] Verify SEO meta tags
- [ ] Set up analytics
- [ ] Configure error monitoring (Sentry, etc.)


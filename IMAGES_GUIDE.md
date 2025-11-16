# Images Integration Guide

Currently, the landing page uses text placeholders for images. This guide explains how to add real images when you're ready.

## Current Image Placeholders

The following sections have image placeholders:

### Capabilities Section
Each capability item has a `photos` array with descriptions:

1. **Raw materials**: Al/Mg granules, billets, powder, wire feedstock
2. **Forging**: wheel, wheel net-shaped blank, generic-blank, forged ring
3. **Extrusion & Rolling**: CNC 5-axis, 3D printed part, colored wheel, rolled sheet
4. **Machining**: (no photos yet)
5. **3D Printing**: 3D printed parts (BCD, bracket, motor-part, another bracket)
6. **Surface Protection**: wheel colors, two-colored wheel, three-colored wheel, polished wheel

## How to Add Images

### Step 1: Prepare Images

1. **Optimize images** before adding:
   - Use WebP format for best compression
   - Resize to appropriate dimensions (max 1920px width)
   - Compress using tools like TinyPNG or Squoosh

2. **Naming convention**:
   - Use descriptive names: `forging-wheel-blank.webp`
   - Use lowercase with hyphens
   - Include category: `capability-forging-wheel.webp`

3. **Recommended sizes**:
   - Hero images: 1920x1080px
   - Section images: 800x600px
   - Thumbnails: 400x300px

### Step 2: Add Images to Project

Place images in the `public/` folder:

```
public/
├── images/
│   ├── capabilities/
│   │   ├── raw-materials/
│   │   │   ├── mg-granules.webp
│   │   │   ├── al-billets.webp
│   │   │   └── ...
│   │   ├── forging/
│   │   │   ├── wheel.webp
│   │   │   ├── wheel-blank.webp
│   │   │   └── ...
│   │   └── ...
│   ├── hero/
│   │   └── hero-background.webp
│   └── company/
│       └── facility.webp
```

### Step 3: Update Components

#### Option A: Using Next.js Image Component (Recommended)

**Install sharp** (for image optimization):
```bash
npm install sharp
```

**Update Capabilities.tsx**:

```tsx
import Image from 'next/image';

// Replace the placeholder div with:
<div className="grid grid-cols-2 gap-2">
  {item.photos.map((photo, photoIndex) => (
    <div key={photoIndex} className="relative h-32">
      <Image
        src={`/images/capabilities/${item.title.toLowerCase()}/${photoIndex + 1}.webp`}
        alt={photo}
        fill
        className="object-cover rounded"
      />
    </div>
  ))}
</div>
```

#### Option B: Using Regular img Tag

```tsx
<div className="grid grid-cols-2 gap-2">
  {item.photos.map((photo, photoIndex) => (
    <img
      key={photoIndex}
      src={`/images/capabilities/${item.title.toLowerCase()}/${photoIndex + 1}.webp`}
      alt={photo}
      className="w-full h-32 object-cover rounded"
    />
  ))}
</div>
```

### Step 4: Update Content Structure

**Option 1: Add image paths to content**

```typescript
// app/content/homeContent.ts
export interface CapabilityItem {
  title: string;
  photos: string[]; // Keep descriptions
  photoUrls?: string[]; // Add URLs
  text: string;
  // ...
}

export const homeContent: HomeContent = {
  capabilities: {
    items: [
      {
        title: "Forging",
        photos: ["wheel", "wheel blank", "generic blank", "forged ring"],
        photoUrls: [
          "/images/capabilities/forging/wheel.webp",
          "/images/capabilities/forging/wheel-blank.webp",
          "/images/capabilities/forging/generic-blank.webp",
          "/images/capabilities/forging/forged-ring.webp",
        ],
        // ...
      },
    ],
  },
}
```

**Update component**:

```tsx
{item.photoUrls ? (
  <div className="grid grid-cols-2 gap-2">
    {item.photoUrls.map((url, photoIndex) => (
      <Image
        key={photoIndex}
        src={url}
        alt={item.photos[photoIndex]}
        width={200}
        height={150}
        className="object-cover rounded"
      />
    ))}
  </div>
) : (
  // Fallback to placeholder
  <div className="grid grid-cols-2 gap-2">
    {item.photos.map((photo, photoIndex) => (
      <div key={photoIndex} className="bg-white rounded p-3 text-xs">
        {photo}
      </div>
    ))}
  </div>
)}
```

## Adding Hero Background Image

### Update HeroBanner.tsx

```tsx
export default function HeroBanner() {
  const { hero, intro } = homeContent;

  return (
    <section className="relative section-padding bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/background.webp"
          alt="REEMS Manufacturing"
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>
      
      {/* Content */}
      <div className="container-custom relative z-10">
        {/* ... existing content ... */}
      </div>
    </section>
  );
}
```

## Using Cloudinary (Recommended for Production)

### Step 1: Setup Cloudinary

1. Create account at [cloudinary.com](https://cloudinary.com)
2. Get your cloud name, API key, and API secret
3. Upload images to Cloudinary

### Step 2: Install Cloudinary SDK

```bash
npm install cloudinary
```

### Step 3: Configure Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
```

### Step 4: Use Cloudinary URLs

```typescript
// app/content/homeContent.ts
const cloudinaryBase = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

export const homeContent: HomeContent = {
  capabilities: {
    items: [
      {
        title: "Forging",
        photoUrls: [
          `${cloudinaryBase}/v1/capabilities/forging/wheel.webp`,
          `${cloudinaryBase}/v1/capabilities/forging/wheel-blank.webp`,
          // ...
        ],
        // ...
      },
    ],
  },
}
```

### Step 5: Configure Next.js for Cloudinary

```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['res.cloudinary.com'],
  },
}
```

## Image Optimization Tips

### 1. Lazy Loading

```tsx
<Image
  src="/image.webp"
  alt="Description"
  width={800}
  height={600}
  loading="lazy" // Lazy load images below the fold
/>
```

### 2. Priority Loading

```tsx
<Image
  src="/hero.webp"
  alt="Hero"
  fill
  priority // Load immediately for above-the-fold images
/>
```

### 3. Responsive Images

```tsx
<Image
  src="/image.webp"
  alt="Description"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

### 4. Blur Placeholder

```tsx
<Image
  src="/image.webp"
  alt="Description"
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..." // Generate with plaiceholder
/>
```

## Image Gallery Component (Optional)

Create a reusable gallery component:

```tsx
// app/components/ImageGallery.tsx
import Image from 'next/image';

interface ImageGalleryProps {
  images: Array<{ url: string; alt: string }>;
  columns?: 2 | 3 | 4;
}

export default function ImageGallery({ images, columns = 2 }: ImageGalleryProps) {
  return (
    <div className={`grid grid-cols-${columns} gap-4`}>
      {images.map((image, index) => (
        <div key={index} className="relative h-48">
          <Image
            src={image.url}
            alt={image.alt}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      ))}
    </div>
  );
}
```

Use in Capabilities.tsx:

```tsx
<ImageGallery
  images={item.photoUrls.map((url, i) => ({
    url,
    alt: item.photos[i],
  }))}
  columns={2}
/>
```

## Lightbox/Modal (Optional)

For full-screen image viewing:

```bash
npm install yet-another-react-lightbox
```

```tsx
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const [open, setOpen] = useState(false);

<Lightbox
  open={open}
  close={() => setOpen(false)}
  slides={item.photoUrls.map(url => ({ src: url }))}
/>
```

## Testing Images

1. **Check all images load**: Open browser dev tools, check Network tab
2. **Verify alt text**: Use screen reader or inspect elements
3. **Test responsive**: Resize browser, check different breakpoints
4. **Check performance**: Use Lighthouse in Chrome DevTools
5. **Verify lazy loading**: Scroll page, watch Network tab

## Image Checklist

- [ ] Images optimized (compressed, correct format)
- [ ] Images placed in `public/images/` folder
- [ ] Components updated to use images
- [ ] Alt text provided for accessibility
- [ ] Next.js Image component used for optimization
- [ ] Lazy loading enabled for below-fold images
- [ ] Priority loading for hero images
- [ ] Responsive sizes configured
- [ ] Images tested on all devices
- [ ] Performance checked with Lighthouse

## Troubleshooting

**Images not loading?**
- Check file path is correct
- Ensure images are in `public/` folder
- Restart dev server after adding images

**Images blurry?**
- Increase image dimensions
- Check quality settings
- Use higher resolution source images

**Slow loading?**
- Compress images more
- Use WebP format
- Enable lazy loading
- Use CDN (Cloudinary)

**Build errors with Next.js Image?**
- Install sharp: `npm install sharp`
- Add domain to `next.config.js` if using external URLs
- Check image dimensions are valid

## Resources

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [WebP Converter](https://squoosh.app/)
- [Image Compression](https://tinypng.com/)


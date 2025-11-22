import { v2 as cloudinary } from 'cloudinary';

// Initialize Cloudinary configuration lazily
// This should only be called on the server side
let isConfigured = false;

function ensureConfigured() {
  // Skip configuration check during build time
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return;
  }

  if (typeof window !== 'undefined') {
    throw new Error('Cloudinary can only be used on the server side');
  }

  if (isConfigured) {
    return;
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  // Only check env vars if we're actually trying to upload (not during build)
  if (!cloudName || !apiKey || !apiSecret) {
    // During development, warn but don't throw if env vars are missing
    // The error will be thrown when actually trying to upload
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        'Cloudinary environment variables are not set. Image uploads will fail until CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET are configured.'
      );
      // Set flag to prevent repeated warnings on subsequent calls
      isConfigured = true;
    } else {
      throw new Error(
        'Missing Cloudinary environment variables. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.'
      );
    }
    return;
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });

  isConfigured = true;
}

export interface UploadResult {
  url: string;
  publicId: string;
}

/**
 * Upload an image to Cloudinary
 * @param buffer - Image file as Buffer
 * @param folder - Optional folder path in Cloudinary (e.g., 'reems/reems-blocks')
 * @returns Promise with secure_url and public_id
 */
export async function uploadImage(
  buffer: Buffer | string,
  folder?: string
): Promise<UploadResult> {
  // Ensure Cloudinary is configured before uploading
  ensureConfigured();

  return new Promise((resolve, reject) => {
    const uploadOptions: any = {
      resource_type: 'image',
    };

    if (folder) {
      uploadOptions.folder = folder;
    }

    // Handle Buffer or base64 string
    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        if (!result || !result.secure_url || !result.public_id) {
          reject(new Error('Cloudinary upload failed: missing result data'));
          return;
        }

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    // If buffer is a string (base64), convert it
    if (typeof buffer === 'string') {
      uploadStream.end(Buffer.from(buffer, 'base64'));
    } else {
      uploadStream.end(buffer);
    }
  });
}


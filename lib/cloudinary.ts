import { v2 as cloudinary } from 'cloudinary';

// Initialize Cloudinary configuration
// This should only be called on the server side
if (typeof window === 'undefined') {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      'Missing Cloudinary environment variables. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.'
    );
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
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


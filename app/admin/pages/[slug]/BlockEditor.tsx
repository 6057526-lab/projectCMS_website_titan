"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateBlockAction } from "./actions";

// Type for Image based on Prisma schema
export type Image = {
  id: string;
  url: string;
  publicId: string;
  alt: string | null;
  blockId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

// Type for Block based on Prisma schema
// bullets and meta are JsonValue from Prisma, which can be string[], object, etc.
export type Block = {
  id: string;
  pageId: string;
  type: string;
  key: string;
  title: string | null;
  subtitle: string | null;
  body: string | null;
  order: number;
  bullets: any; // JsonValue from Prisma - can be string[], object, null, etc.
  meta: any; // JsonValue from Prisma
  images?: Image[]; // Images associated with this block
  createdAt: Date;
  updatedAt: Date;
};

interface BlockEditorProps {
  block: Block;
}

export default function BlockEditor({ block }: BlockEditorProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageUploadError, setImageUploadError] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageAlt, setImageAlt] = useState("");
  
  // Parse bullets if they exist
  const initialBullets = block.bullets
    ? (Array.isArray(block.bullets) ? (block.bullets as string[]).join("\n") : "")
    : "";

  // Get images for this block
  const blockImages = block.images || [];

  // SKIP INTRO BLOCK from rendering in editor
  // The intro section has been merged into Hero for the new design.
  // We hide it here to prevent confusion.
  if (block.type === "INTRO") {
    return null;
  }

  const handleImageUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setImageUploadError("Please select a file");
      return;
    }

    setIsUploadingImage(true);
    setImageUploadError("");
    setSuccessMessage("");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("blockId", block.id);
      if (imageAlt.trim()) {
        formData.append("alt", imageAlt.trim());
      }

      const response = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Image upload failed");
      }

      setSuccessMessage("Image uploaded successfully!");
      setSelectedFile(null);
      setImageAlt("");
      
      // Reset file input
      const fileInput = document.getElementById(`file-input-${block.id}`) as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }

      // Refresh to get updated data
      router.refresh();
      
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error uploading image:", error);
      setImageUploadError(
        error instanceof Error ? error.message : "Failed to upload image. Please try again."
      );
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    setIsSaving(true);
    setSuccessMessage("");
    setErrorMessage("");
    
    try {
      await updateBlockAction(block.id, formData);
      setSuccessMessage("Block updated successfully!");
      setIsEditing(false);
      
      // Refresh the router to get updated data from server
      router.refresh();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error updating block:", error);
      setErrorMessage("Failed to update block. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800">
              {block.type.replace(/_/g, ' ')}
            </span>
            {block.key && <span className="text-xs text-gray-500 font-mono bg-gray-100 px-1 py-0.5 rounded">ID: {block.key}</span>}
          </div>
        </div>
        
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 text-sm bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-md transition-colors shadow-sm"
          >
            Edit Content
          </button>
        )}
      </div>

      {successMessage && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-800 rounded text-sm">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded text-sm">
          {errorMessage}
        </div>
      )}

      {isEditing ? (
        <form action={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title / Headline
            </label>
            <input
              type="text"
              name="title"
              defaultValue={block.title || ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subtitle / Lead Text
            </label>
            <input
              type="text"
              name="subtitle"
              defaultValue={block.subtitle || ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Body Text / Description
            </label>
            <textarea
              name="body"
              rows={4}
              defaultValue={block.body || ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bullet Points (one per line)
            </label>
            <textarea
              name="bullets"
              rows={6}
              defaultValue={initialBullets}
              placeholder="Enter each bullet point on a new line"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
            />
            <p className="mt-1 text-xs text-gray-500">
              Each line becomes a bullet point in the list.
            </p>
          </div>

          <div className="flex space-x-3 pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              disabled={isSaving}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 transition-colors shadow-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4 text-sm">
          {block.title && (
            <div>
              <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Title</span>
              <p className="text-gray-900 text-base font-medium">{block.title}</p>
            </div>
          )}
          
          {block.subtitle && (
            <div>
              <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Subtitle</span>
              <p className="text-gray-900">{block.subtitle}</p>
            </div>
          )}
          
          {block.body && (
            <div>
              <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Body Text</span>
              <p className="text-gray-900 whitespace-pre-wrap">{block.body}</p>
            </div>
          )}
          
          {block.bullets && Array.isArray(block.bullets) && (block.bullets as string[]).length > 0 && (
            <div>
              <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Bullets</span>
              <ul className="list-disc list-inside space-y-1">
                {(block.bullets as string[]).map((bullet, index) => (
                  <li key={index} className="text-gray-900">{bullet}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Images Section */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Block Images</h3>
        
        {/* Images List */}
        {blockImages.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            {blockImages.map((image) => (
              <div key={image.id} className="relative group">
                <div className="aspect-square relative rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                  <img
                    src={image.url}
                    alt={image.alt || "Block image"}
                    className="w-full h-full object-cover"
                  />
                </div>
                {image.alt && (
                  <p className="mt-2 text-xs text-gray-600 truncate" title={image.alt}>{image.alt}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-6 text-center mb-6">
            <p className="text-sm text-gray-500">No images uploaded for this block yet.</p>
          </div>
        )}

        {/* Upload Form */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Upload New Image</h4>
          <form onSubmit={handleImageUpload} className="space-y-3">
            <div>
              <input
                id={`file-input-${block.id}`}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark cursor-pointer"
              />
            </div>

            <div>
              <input
                id={`alt-input-${block.id}`}
                type="text"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                placeholder="Image description (alt text)"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {imageUploadError && (
              <div className="text-red-600 text-xs">
                {imageUploadError}
              </div>
            )}

            <button
              type="submit"
              disabled={isUploadingImage || !selectedFile}
              className="w-full sm:w-auto px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-md hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              {isUploadingImage ? "Uploading..." : "Upload Image"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

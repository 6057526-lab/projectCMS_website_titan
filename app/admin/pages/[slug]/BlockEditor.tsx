"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateBlockAction } from "./actions";

// Type for Block based on Prisma schema
export type Block = {
  id: string;
  pageId: string;
  type: string;
  key: string;
  title: string | null;
  subtitle: string | null;
  body: string | null;
  order: number;
  bullets: string[] | null;
  meta: any;
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
  
  // Parse bullets if they exist
  const initialBullets = block.bullets
    ? (Array.isArray(block.bullets) ? (block.bullets as string[]).join("\n") : "")
    : "";

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
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800">
              {block.type}
            </span>
            <span className="text-sm text-gray-500">Key: {block.key}</span>
          </div>
        </div>
        
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
          >
            Edit
          </button>
        )}
      </div>

      {successMessage && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-800 rounded">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded">
          {errorMessage}
        </div>
      )}

      {isEditing ? (
        <form action={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              defaultValue={block.title || ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subtitle
            </label>
            <input
              type="text"
              name="subtitle"
              defaultValue={block.subtitle || ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Body
            </label>
            <textarea
              name="body"
              rows={4}
              defaultValue={block.body || ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bullets (one per line)
            </label>
            <textarea
              name="bullets"
              rows={6}
              defaultValue={initialBullets}
              placeholder="Enter each bullet point on a new line"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            />
            <p className="mt-1 text-xs text-gray-500">
              Each line will become a separate bullet point
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              disabled={isSaving}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-3 text-sm">
          {block.title && (
            <div>
              <span className="font-semibold text-gray-700">Title:</span>
              <p className="mt-1 text-gray-900">{block.title}</p>
            </div>
          )}
          
          {block.subtitle && (
            <div>
              <span className="font-semibold text-gray-700">Subtitle:</span>
              <p className="mt-1 text-gray-900">{block.subtitle}</p>
            </div>
          )}
          
          {block.body && (
            <div>
              <span className="font-semibold text-gray-700">Body:</span>
              <p className="mt-1 text-gray-900 whitespace-pre-wrap">{block.body}</p>
            </div>
          )}
          
          {block.bullets && Array.isArray(block.bullets) && (block.bullets as string[]).length > 0 && (
            <div>
              <span className="font-semibold text-gray-700">Bullets:</span>
              <ul className="mt-1 list-disc list-inside space-y-1">
                {(block.bullets as string[]).map((bullet, index) => (
                  <li key={index} className="text-gray-900">{bullet}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


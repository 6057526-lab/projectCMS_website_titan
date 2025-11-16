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

  const handleImageUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setImageUploadError("Пожалуйста, выберите файл");
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
        throw new Error(data.error || "Ошибка загрузки изображения");
      }

      setSuccessMessage("Изображение успешно загружено!");
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
        error instanceof Error ? error.message : "Не удалось загрузить изображение. Пожалуйста, попробуйте снова."
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
      setSuccessMessage("Блок успешно обновлен!");
      setIsEditing(false);
      
      // Refresh the router to get updated data from server
      router.refresh();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error updating block:", error);
      setErrorMessage("Не удалось обновить блок. Пожалуйста, попробуйте снова.");
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
            <span className="text-sm text-gray-500">Ключ: {block.key}</span>
          </div>
        </div>
        
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
          >
            Редактировать
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
              Заголовок
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
              Подзаголовок
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
              Текст
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
              Маркированный список (по одному пункту на строку)
            </label>
            <textarea
              name="bullets"
              rows={6}
              defaultValue={initialBullets}
              placeholder="Введите каждый пункт списка с новой строки"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            />
            <p className="mt-1 text-xs text-gray-500">
              Каждая строка станет отдельным пунктом списка
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSaving ? "Сохранение..." : "Сохранить"}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              disabled={isSaving}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 transition-colors"
            >
              Отмена
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-3 text-sm">
          {block.title && (
            <div>
              <span className="font-semibold text-gray-700">Заголовок:</span>
              <p className="mt-1 text-gray-900">{block.title}</p>
            </div>
          )}
          
          {block.subtitle && (
            <div>
              <span className="font-semibold text-gray-700">Подзаголовок:</span>
              <p className="mt-1 text-gray-900">{block.subtitle}</p>
            </div>
          )}
          
          {block.body && (
            <div>
              <span className="font-semibold text-gray-700">Текст:</span>
              <p className="mt-1 text-gray-900 whitespace-pre-wrap">{block.body}</p>
            </div>
          )}
          
          {block.bullets && Array.isArray(block.bullets) && (block.bullets as string[]).length > 0 && (
            <div>
              <span className="font-semibold text-gray-700">Маркированный список:</span>
              <ul className="mt-1 list-disc list-inside space-y-1">
                {(block.bullets as string[]).map((bullet, index) => (
                  <li key={index} className="text-gray-900">{bullet}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Images Section */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Картинки блока</h3>
        
        <p className="text-sm text-gray-600 mb-4">
          Картинки загружаются в облако (Cloudinary). После загрузки они автоматически привязываются к этому блоку.
        </p>

        {/* Upload Form */}
        <form onSubmit={handleImageUpload} className="mb-6 space-y-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <label htmlFor={`file-input-${block.id}`} className="block text-sm font-medium text-gray-700 mb-1">
              Выберите изображение (JPEG, PNG, WebP, макс. 5MB)
            </label>
            <input
              id={`file-input-${block.id}`}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div>
            <label htmlFor={`alt-input-${block.id}`} className="block text-sm font-medium text-gray-700 mb-1">
              Описание (alt текст) - необязательно
            </label>
            <input
              id={`alt-input-${block.id}`}
              type="text"
              value={imageAlt}
              onChange={(e) => setImageAlt(e.target.value)}
              placeholder="Описание изображения"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {imageUploadError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded text-sm">
              {imageUploadError}
            </div>
          )}

          <button
            type="submit"
            disabled={isUploadingImage || !selectedFile}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isUploadingImage ? "Загрузка..." : "Загрузить изображение"}
          </button>
        </form>

        {/* Images List */}
        {blockImages.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {blockImages.map((image) => (
              <div key={image.id} className="relative group">
                <div className="aspect-square relative rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={image.url}
                    alt={image.alt || "Изображение блока"}
                    className="w-full h-full object-cover"
                  />
                </div>
                {image.alt && (
                  <p className="mt-2 text-xs text-gray-600 truncate">{image.alt}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">Картинки не загружены для этого блока.</p>
        )}
      </div>
    </div>
  );
}


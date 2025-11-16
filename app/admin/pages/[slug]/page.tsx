import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import BlockEditor, { type Block } from "./BlockEditor";

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PageEditorPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  // Fetch the page and its blocks
  const page = await prisma.page.findUnique({
    where: { slug },
    include: {
      blocks: {
        orderBy: { order: "asc" },
      },
    },
  });

  if (!page) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Link 
            href="/admin/page-list" 
            className="text-blue-600 hover:text-blue-800 text-sm mb-2 inline-block"
          >
            ← Назад к списку страниц
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{page.title}</h1>
          <p className="mt-1 text-sm text-gray-500">Slug: {page.slug}</p>
        </div>
      </div>

      <div className="space-y-6">
        {page.blocks.map((block: Block) => (
          <BlockEditor key={block.id} block={block} />
        ))}

        {page.blocks.length === 0 && (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
            Блоки не найдены для этой страницы.
          </div>
        )}
      </div>
    </div>
  );
}


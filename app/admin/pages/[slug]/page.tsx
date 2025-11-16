import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import BlockEditor from "./BlockEditor";

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
            ← Back to Pages
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{page.title}</h1>
          <p className="mt-1 text-sm text-gray-500">Slug: {page.slug}</p>
        </div>
      </div>

      <div className="space-y-6">
        {page.blocks.map((block) => (
          <BlockEditor key={block.id} block={block} />
        ))}

        {page.blocks.length === 0 && (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
            No blocks found for this page.
          </div>
        )}
      </div>
    </div>
  );
}


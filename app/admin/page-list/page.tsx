import Link from "next/link";
import { prisma } from "@/lib/db";

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PageListPage() {
  // Fetch all pages from the database
  const pages = await prisma.page.findMany({
    select: {
      id: true,
      slug: true,
      title: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Страницы</h1>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Название
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Адрес (Slug)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Последнее обновление
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pages.map((page: { id: string; slug: string; title: string; updatedAt: Date }) => (
              <tr key={page.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {page.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {page.slug}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(page.updatedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    href={`/admin/pages/${page.slug}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Редактировать
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {pages.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Страницы не найдены. Запустите seed скрипт для создания тестовых данных.
          </div>
        )}
      </div>
    </div>
  );
}


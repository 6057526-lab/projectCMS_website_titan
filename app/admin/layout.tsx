import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import { verifyAuthToken, AUTH_COOKIE_NAME } from "@/lib/auth";
import LogoutButton from "./LogoutButton";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if this is the login page by checking headers from middleware
  const headersList = await headers();
  const isLoginPage = headersList.get("x-pathname") === "/admin/login";
  
  // Skip authentication check for login page
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Server-side authentication check for other admin pages
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    redirect("/admin/login");
  }

  const user = await verifyAuthToken(token);

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">REEMS Admin</h1>
            <span className="text-sm text-gray-600">({user.email})</span>
          </div>
          <LogoutButton />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}


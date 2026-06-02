import { isAdmin } from "@/lib/admin-actions";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, User, Briefcase, Folder, Award, Code, Settings, GraduationCap, LogOut } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { SignOutButton } from "@clerk/nextjs";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId, redirectToSignIn } = await auth();
  
  if (!userId) {
    return redirectToSignIn();
  }

  const isUserAdmin = await isAdmin();

  if (!isUserAdmin) {
    redirect("/");
  }

  const adminNav = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Profile & Home", href: "/admin/profile", icon: User },
    { name: "Work Experience", href: "/admin/work-experience", icon: Briefcase },
    { name: "Education", href: "/admin/education", icon: GraduationCap },
    { name: "Projects", href: "/admin/projects", icon: Folder },
    { name: "About Page", href: "/admin/about", icon: User },
    { name: "Certifications", href: "/admin/certifications", icon: Award },
    { name: "Badges", href: "/admin/badges", icon: Award },
    { name: "Skills", href: "/admin/skills", icon: Code },
    { name: "Site Config", href: "/admin/site-config", icon: Settings },
  ];

  return (
    <div className="flex h-full text-gray-300">
      {/* Admin Sidebar (Inner) */}
      <div className="flex w-64 flex-col border-r border-gray-700 bg-gray-800 p-4">
        <h2 className="mb-6 text-xl font-bold text-white">Admin Panel</h2>
        <nav className="flex-1 space-y-2">
          {adminNav.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 hover:bg-gray-700 hover:text-white"
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="mt-auto pt-4 border-t border-gray-700">
          <SignOutButton redirectUrl="/">
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-red-400 hover:bg-gray-700 hover:text-red-300">
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </SignOutButton>
        </div>
      </div>

      {/* Admin Content Area */}
      <div className="flex-1 overflow-y-auto p-8">
        {children}
      </div>
    </div>
  );
}

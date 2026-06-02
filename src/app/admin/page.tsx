import { getProfile, getProjects, getWorkExperience, getSkills, getCertifications } from "@/lib/content-fetchers";
import { Card } from "@/components/ui/card";
import { Briefcase, Folder, Award, Code } from "lucide-react";

export default async function AdminDashboard() {
  const profile = await getProfile();
  const projects = await getProjects();
  const exp = await getWorkExperience();
  const skills = await getSkills();
  const certs = await getCertifications();

  const stats = [
    { name: "Projects", count: projects.length, icon: Folder, color: "text-blue-400" },
    { name: "Work Experiences", count: exp.length, icon: Briefcase, color: "text-green-400" },
    { name: "Skills (Visible)", count: skills.length, icon: Code, color: "text-yellow-400" },
    { name: "Certifications", count: certs.length, icon: Award, color: "text-purple-400" },
  ];

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold text-white">Dashboard</h1>
      
      <div className="mb-8 rounded-lg bg-gray-800 p-6">
        <h2 className="text-xl font-semibold text-white">Welcome, {profile.name}!</h2>
        <p className="mt-2 text-gray-400">
          This is your central hub for editing all content in your portfolio. Changes made here are saved to the database and immediately reflected across the site.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name} className="border-gray-700 bg-gray-800 p-6">
              <div className="flex items-center gap-4">
                <div className={`rounded-full bg-gray-700 p-3 ${stat.color}`}>
                  <Icon size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">{stat.name}</p>
                  <p className="text-2xl font-bold text-white">{stat.count}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

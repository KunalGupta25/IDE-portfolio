import { getProjects } from "@/lib/content-fetchers";
import ProjectManager from "./ProjectManager";

export default async function ProjectsAdminPage() {
  const projects = await getProjects();

  return (
    <div className="max-w-6xl">
      <h1 className="mb-8 text-3xl font-bold text-white">Projects</h1>
      <ProjectManager initialData={projects} />
    </div>
  );
}

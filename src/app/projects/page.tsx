import { getProjects } from "@/lib/content-fetchers";
import { ModernInnerShadowCardVariant1 } from "./_components/ModernInnerShadowCardVariant1";

const DEFAULT_IMAGE = "/placeholder.jpg";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="p-4 text-gray-300">
      <h1 className="mb-6 text-3xl font-bold">Projects</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ModernInnerShadowCardVariant1
            key={project.slug}
            title={project.title}
            hoverTitle={`View ${project.title}`}
            description={project.summary}
            tag="Project"
            image={project.image || DEFAULT_IMAGE}
            href={`/projects/${project.slug}`}
            liveUrl={project.liveUrl}
            githubUrl={project.githubUrl}
          />
        ))}
      </div>
    </div>
  );
}

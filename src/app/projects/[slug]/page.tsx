import { getProjects } from "@/lib/content-fetchers";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { useMDXComponents as getMDXComponents } from "../../../../mdx-components";
import { Button } from "@/components/ui/button";

const DEFAULT_IMAGE = "/placeholder.jpg";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const filteredProjects = await getProjects();
  const project = filteredProjects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const components = getMDXComponents({});

  let normalizedImage = project.image?.replace(/\\/g, "/") || DEFAULT_IMAGE;
  if (!normalizedImage.startsWith("http") && !normalizedImage.startsWith("/") && !normalizedImage.startsWith("data:")) {
    normalizedImage = `/${normalizedImage}`;
  }

  return (
    <div className="p-4 text-gray-300 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-gray-400 transition-colors hover:text-gray-200"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Projects</span>
        </Link>
      </div>

      <div className="mb-8 overflow-hidden rounded-2xl border border-gray-700 bg-gray-800">
        <div className="relative h-[300px] sm:h-[400px] w-full bg-black">
          <Image
            src={normalizedImage}
            alt={project.title}
            fill
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 sm:p-8 w-full">
            <div className="mb-3 inline-block rounded-full bg-blue-500/20 px-3 py-1 text-sm text-blue-400 border border-blue-500/30 backdrop-blur-md">
              Project
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">{project.title}</h1>
            <p className="text-lg text-gray-300 max-w-2xl">{project.summary}</p>
          </div>
        </div>

        <div className="p-6 sm:p-8 bg-gray-900 flex flex-wrap gap-4 border-b border-gray-700">
          {project.liveUrl && (
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <ExternalLink size={16} /> Live Demo
              </a>
            </Button>
          )}
          {project.githubUrl && (
            <Button asChild variant="outline" className="border-gray-600 hover:bg-gray-800 text-white">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Github size={16} /> View Source
              </a>
            </Button>
          )}
        </div>

        {project.content && (
          <div className="p-6 sm:p-8 prose prose-invert max-w-none prose-a:text-blue-400 hover:prose-a:text-blue-300">
            <MDXRemote source={project.content} components={components} />
          </div>
        )}
      </div>
    </div>
  );
}

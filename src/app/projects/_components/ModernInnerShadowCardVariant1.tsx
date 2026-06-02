"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";

interface Props {
  title: string;
  hoverTitle: string;
  description: string;
  tag?: string;
  image?: string;
  href?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export function ModernInnerShadowCardVariant1({
  title,
  hoverTitle,
  description,
  tag = "Project",
  image = "/placeholder.jpg",
  href,
  liveUrl,
  githubUrl,
}: Props) {
  let normalizedImage = image?.replace(/\\/g, "/") || "/placeholder.jpg";
  if (!normalizedImage.startsWith("http") && !normalizedImage.startsWith("/") && !normalizedImage.startsWith("data:")) {
    normalizedImage = `/${normalizedImage}`;
  }

  return (
    <div className="group relative h-[400px] overflow-hidden rounded-2xl border bg-gradient-to-t from-[#242424] to-[#020202] transition-colors duration-300 hover:from-[#182135] hover:to-[#080808]">
      {href && (
        <Link href={href} className="absolute inset-0 z-10" aria-label={`View ${title}`} />
      )}
      <div className="relative flex h-full flex-col">
        <div className="px-6 py-5">
          <div className="flex justify-between items-start mb-1">
            <div className="w-fit rounded-full bg-white px-3 py-1 text-sm text-black transition-all duration-300 ease-in-out group-hover:bg-blue-400 group-hover:text-white relative z-20">
              {tag}
            </div>
            
            <div className="flex gap-2 relative z-20">
              {githubUrl && (
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors" onClick={(e) => e.stopPropagation()}>
                  <Github size={16} />
                </a>
              )}
              {liveUrl && (
                <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors" onClick={(e) => e.stopPropagation()}>
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
          <span className="mb-1 inline-block pt-2 text-lg font-semibold text-slate-200 transition-all duration-300 ease-in-out group-hover:hidden">
            {title}
          </span>
          <span className="mb-1 hidden pt-2 text-lg font-semibold text-slate-200 transition-all duration-300 ease-in-out group-hover:inline-block">
            {hoverTitle}
          </span>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
        <div className="relative mt-auto h-[180px] w-full overflow-hidden">
          <Image
            className="m-0 h-full w-full scale-100 object-cover p-0 grayscale transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:grayscale-0"
            src={normalizedImage}
            width={500}
            height={180}
            alt={title}
          />
        </div>
      </div>
    </div>
  );
}

export default ModernInnerShadowCardVariant1;

import { StyledCode } from "@/components/StyledCode";
import prisma from "@/lib/prisma";
import { MDXRemote } from "next-mdx-remote/rsc";
import { useMDXComponents as getMDXComponents } from "../../../mdx-components";
import { getSkills, getEducation, getBadges } from "@/lib/content-fetchers";
import Image from "next/image";

export default async function AboutPage() {
  const profile = await prisma.profileContent.findUnique({
    where: { id: "singleton" },
  });

  const skills = await getSkills();
  const education = await getEducation();
  const badges = await getBadges();
  const components = getMDXComponents({});

  const generateDeveloperCode = () => {
    if (!profile) return "";
    
    // Format skills for code block
    const snippetSkills = skills.filter((s) => s.showInSnippet);
    const formattedSkills = snippetSkills
      .map((s) => `    "${s.label}"`)
      .join(",\n");

    return `interface Developer {
  name: string;
  role: string;
  location: string;
  currentCompany: string;
  skills: string[];
  yearsOfExperience: number;
}

// Personal Information
const me: Developer = {
  name: "${profile.name}",
  role: "${profile.title}",
  location: "${profile.location}",
  currentCompany: "${profile.currentCompany}",
  yearsOfExperience: ${profile.yearsOfExperience},
  skills: [
${formattedSkills}
  ],
};`;
  };

  return (
    <div className="text-gray-300">
      <div className="grid grid-cols-1 gap-8 p-4 lg:grid-cols-2">
        {/* Text Column */}
        <div className="space-y-6">
          
          {/* About Content (Markdown) */}
          <div>
            <h1 className="mb-4 text-2xl font-bold text-slate-200">About Me</h1>
            {profile ? (
              <div className="prose prose-invert max-w-none text-slate-400 prose-headings:text-slate-200 prose-h1:mb-4 prose-h1:text-2xl prose-h1:font-bold prose-h2:mb-3 prose-h2:text-xl prose-h2:font-semibold">
                <MDXRemote source={profile.aboutContent || profile.bioExtended || profile.bio} components={components} />
              </div>
            ) : (
              <p className="text-slate-400">
                (Content needs to be added via Admin Panel)
              </p>
            )}
          </div>

          {/* Skills Section */}
          {skills.some(s => s.aboutCategory) && (
            <div className="space-y-6">
              <h2 className="mb-3 text-xl font-semibold text-slate-200">Skills</h2>
              <div className="space-y-4">
                {["Languages", "Frameworks", "AI/ML", "Database", "Tools"].map((cat) => {
                  const catSkills = skills.filter(s => s.aboutCategory === cat);
                  if (catSkills.length === 0) return null;
                  return (
                    <div key={cat}>
                      <h3 className="text-slate-300 font-medium mb-2">{cat}</h3>
                      <div className="flex flex-wrap gap-2">
                        {catSkills.map((skill) => (
                          <span key={skill.id} className="text-slate-400 bg-gray-800/50 px-3 py-1 rounded-md text-sm border border-gray-700">
                            {skill.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Badges Section */}
          {badges.length > 0 && (
            <div>
              <h2 className="mb-3 text-xl font-semibold text-slate-200">
                Badges
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {badges.map((badge) => (
                  <a key={badge.id} href={badge.link || "#"} target="_blank" rel="noopener noreferrer" className="block">
                    {badge.image ? (
                      <Image 
                        src={badge.image} 
                        alt={badge.name} 
                        width={150} 
                        height={150} 
                        className="rounded-lg transition-transform hover:scale-105" 
                      />
                    ) : (
                      <div className="flex h-[150px] w-[150px] items-center justify-center rounded-lg bg-gray-800 text-sm text-gray-400 border border-gray-700 transition-transform hover:scale-105 text-center p-2">
                        {badge.name}
                      </div>
                    )}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Education Section */}
          {education.length > 0 && (
            <div>
              <h2 className="mb-3 text-xl font-semibold text-slate-200">Education</h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="rounded-lg bg-gray-800 p-4 border border-gray-700">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                      <h3 className="text-slate-200 font-semibold text-lg">{edu.degree}</h3>
                      <span className="text-slate-400 text-sm whitespace-nowrap mt-1 sm:mt-0">{edu.period}</span>
                    </div>
                    <p className="text-blue-400 text-sm mb-3">{edu.school}</p>
                    {edu.description && (
                      <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-wrap">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Code Column */}
        <div className="rounded-lg bg-gray-800 p-4 self-start lg:sticky lg:top-4">
          <StyledCode code={generateDeveloperCode()} language="typescript" />
        </div>
      </div>
    </div>
  );
}

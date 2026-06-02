import prisma from "./prisma";

export async function getProfile() {
  const profile = await prisma.profileContent.findUnique({
    where: { id: "singleton" },
  });
  if (profile) return profile;

  // Fallback defaults if DB is empty
  return {
    id: "singleton",
    name: "Kunal Gupta",
    title: "Senior Sales Systems Analyst",
    tagline: "Full Stack Developer specializing in modern web applications. I craft elegant solutions using Next.js, TypeScript, and cutting-edge technologies.",
    bio: "Hi, I'm Kunal Gupta, a passionate Full Stack Developer with a deep love for creating elegant solutions to complex problems. With a background in both front-end and back-end development, I bring a comprehensive approach to web development.",
    bioExtended: "I specialize in building modern web applications and Salesforce solutions using cutting-edge technologies. I believe in writing clean, maintainable code that solves real-world problems. I'm constantly learning and adapting to new technologies while maintaining a strong foundation in software development principles.",
    location: "Boston, MA",
    email: "KunalGupta25@gmail.com",
    phone: "(617) 217-1785",
    availability: "Open to opportunities",
    githubUrl: "https://github.com/KunalGupta25",
    linkedinUrl: "https://www.linkedin.com/in/patrick-carter-306746a8/",
    salesforceUrl: "https://www.salesforce.com/trailblazer/pcarter8",
    portfolioUrl: "https://nextjs-personal-portfolio-nu.vercel.app/",
    updatedAt: new Date(),
  };
}

export async function getWorkExperience() {
  const exps = await prisma.workExperience.findMany({
    orderBy: { order: "asc" },
  });
  return exps;
}

export async function getProjects(category?: string) {
  const where = category ? { technology: { equals: category, mode: "insensitive" as const } } : {};
  const projs = await prisma.project.findMany({
    where,
    orderBy: { order: "asc" },
  });
  return projs;
}

export async function getProject(slug: string) {
  const proj = await prisma.project.findUnique({
    where: { slug },
  });
  return proj;
}

export async function getCertifications() {
  const certs = await prisma.certification.findMany({
    orderBy: { order: "asc" },
  });
  return certs;
}

export async function getSkills() {
  const skills = await prisma.skill.findMany({
    orderBy: { order: "asc" },
  });
  return skills;
}

export async function getSiteConfig(key: string) {
  try {
    const config = await prisma.siteConfig.findUnique({
      where: { id: key },
    });
    return config?.value || "";
  } catch (error) {
    console.error(`Error fetching config ${key}:`, error);
    return "";
  }
}

export async function getEducation() {
  try {
    return await prisma.education.findMany({
      orderBy: { order: "asc" },
    });
  } catch (error) {
    console.error("Error fetching education:", error);
    return [];
  }
}

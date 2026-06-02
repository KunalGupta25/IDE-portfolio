import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  // 1. Profile
  await prisma.profileContent.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      name: "Patrick Carter",
      title: "Senior Sales Systems Analyst",
      tagline: "Full Stack Developer specializing in modern web applications. I craft elegant solutions using Next.js, TypeScript, and cutting-edge technologies.",
      bio: "Hi, I'm Patrick Carter, a passionate Full Stack Developer with a deep love for creating elegant solutions to complex problems. With a background in both front-end and back-end development, I bring a comprehensive approach to web development.",
      bioExtended: "I specialize in building modern web applications and Salesforce solutions using cutting-edge technologies. I believe in writing clean, maintainable code that solves real-world problems. I'm constantly learning and adapting to new technologies while maintaining a strong foundation in software development principles.",
      location: "Boston, MA",
      email: "xcarter93@gmail.com",
      phone: "(617) 217-1785",
      availability: "Open to opportunities",
      githubUrl: "https://github.com/xCarter93",
      linkedinUrl: "https://www.linkedin.com/in/patrick-carter-306746a8/",
      salesforceUrl: "https://www.salesforce.com/trailblazer/pcarter8",
      portfolioUrl: "https://nextjs-personal-portfolio-nu.vercel.app/",
    },
  });

  // 2. Work Experience
  const workExp = [
    { period: "Feb 2016 - Apr 2017", role: "Cost Analysis and Savings Analyst", company: "Granite Telecommunications LLC", description: "Analyzed telecom expenses and identified cost-saving opportunities for enterprise clients." },
    { period: "Apr 2017 - Jun 2017", role: "Senior Cost Analysis and Savings Analyst", company: "Granite Telecommunications LLC", description: "Led cost optimization initiatives and mentored junior analysts." },
    { period: "Jun 2017 - Apr 2019", role: "Cost Analysis and Savings Supervisor", company: "Granite Telecommunications LLC", description: "Managed a team of 8 analysts, overseeing $5M+ in annual cost savings initiatives." },
    { period: "Apr 2019 - Nov 2020", role: "Senior Offer Management Supervisor", company: "Granite Telecommunications LLC", description: "Led a team of 12 offer management specialists. Streamlined pricing processes and improved quote turnaround time by 40%." },
    { period: "Nov 2020 - Jun 2021", role: "Team Lead, Order Operations", company: "Datadog", description: "Established and led the Order Operations team. Implemented Salesforce automation that reduced manual processing time by 60%." },
    { period: "Jun 2021 - Apr 2024", role: "Manager, Order Operations", company: "Datadog", description: "Managed a global team of 8 specialists. Led system integration projects and process automation initiatives." },
    { period: "Apr 2024 - Present", role: "Senior Sales Systems Analyst", company: "Datadog", description: "Lead technical initiatives to optimize sales operations. Develop and implement Salesforce solutions." },
  ];

  await prisma.workExperience.deleteMany();
  for (let i = 0; i < workExp.length; i++) {
    await prisma.workExperience.create({
      data: { ...workExp[i], order: i },
    });
  }

  // 3. Certifications
  const certs = [
    { name: "Salesforce JavaScript Developer I", image: "/jd1_cert.png" },
    { name: "Salesforce Platform App Builder", image: "/pba_cert.png" },
    { name: "Salesforce Administrator", image: "/sfadmin_cert.png" },
    { name: "Salesforce Platform Developer I", image: "/pd1_cert.png" },
  ];

  await prisma.certification.deleteMany();
  for (let i = 0; i < certs.length; i++) {
    await prisma.certification.create({
      data: { ...certs[i], order: i },
    });
  }

  // 4. Skills
  const skillsConfig = [
    { label: "HTML5", iconType: "html", orbitLevel: 1 },
    { label: "CSS3", iconType: "css", orbitLevel: 1 },
    { label: "JavaScript", iconType: "javascript", orbitLevel: 1 },
    { label: "React", iconType: "react", orbitLevel: 2 },
    { label: "Next.js", iconType: "nextjs", orbitLevel: 2 },
    { label: "TypeScript", iconType: "typescript", orbitLevel: 2 },
    { label: "Tailwind CSS", iconType: "tailwind", orbitLevel: 2 },
    { label: "Python", iconType: "python", orbitLevel: 3 },
    { label: "Salesforce", iconType: "salesforce", orbitLevel: 3 },
    { label: "MongoDB", iconType: "mongodb", orbitLevel: 3 },
    { label: "PostgreSQL", iconType: "postgresql", orbitLevel: 3 },
  ];

  await prisma.skill.deleteMany();
  for (let i = 0; i < skillsConfig.length; i++) {
    await prisma.skill.create({
      data: { ...skillsConfig[i], order: i },
    });
  }

  // 5. Projects
  const getContents = (await import("../src/lib/contents")).getContents;
  const projects = getContents("projects");
  
  await prisma.project.deleteMany();
  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    await prisma.project.create({
      data: {
        slug: p.slug,
        title: p.metadata.title || p.slug,
        summary: p.metadata.summary || "",
        image: p.metadata.image || "",
        technology: p.metadata.technology || "",
        content: p.content,
        order: i,
      }
    });
  }

  // 6. Site Config
  await prisma.siteConfig.upsert({ where: { id: "siteTitle" }, update: {}, create: { id: "siteTitle", value: "Portfolio - IDE Style" } });
  await prisma.siteConfig.upsert({ where: { id: "siteDescription" }, update: {}, create: { id: "siteDescription", value: "A developer portfolio styled like a modern IDE" } });
  await prisma.siteConfig.upsert({ where: { id: "githubBranch" }, update: {}, create: { id: "githubBranch", value: "main" } });
  await prisma.siteConfig.upsert({ where: { id: "wakatimeBadgeUrl" }, update: {}, create: { id: "wakatimeBadgeUrl", value: "https://wakatime.com/badge/user/80aca99d-fb3d-4239-8ed6-9f39fbcab253.svg" } });

  console.log("Database seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


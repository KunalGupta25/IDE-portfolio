"use server";

import prisma from "./prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function isAdmin() {
  const user = await currentUser();
  const adminId = process.env.ADMIN_USER_ID;
  if (!user || !adminId || user.id !== adminId) {
    return false;
  }
  return true;
}

export async function updateProfile(data: any) {
  if (!(await isAdmin())) throw new Error("Unauthorized");
  
  const updateData = { ...data };
  if (updateData.yearsOfExperience) {
    updateData.yearsOfExperience = parseInt(updateData.yearsOfExperience, 10);
  }

  await prisma.profileContent.upsert({
    where: { id: "singleton" },
    update: updateData,
    create: { id: "singleton", ...updateData },
  });
  revalidatePath("/", "layout");
}

export async function createWorkExperience(data: any) {
  if (!(await isAdmin())) throw new Error("Unauthorized");
  await prisma.workExperience.create({ data });
  revalidatePath("/work-experience");
}

export async function updateWorkExperience(id: string, data: any) {
  if (!(await isAdmin())) throw new Error("Unauthorized");
  await prisma.workExperience.update({ where: { id }, data });
  revalidatePath("/work-experience");
}

export async function deleteWorkExperience(id: string) {
  if (!(await isAdmin())) throw new Error("Unauthorized");
  await prisma.workExperience.delete({ where: { id } });
  revalidatePath("/work-experience");
}

export async function reorderWorkExperience(ids: string[]) {
  if (!(await isAdmin())) throw new Error("Unauthorized");
  for (let i = 0; i < ids.length; i++) {
    await prisma.workExperience.update({
      where: { id: ids[i] },
      data: { order: i },
    });
  }
  revalidatePath("/work-experience");
}

export async function createProject(data: any) {
  if (!(await isAdmin())) throw new Error("Unauthorized");
  await prisma.project.create({ data });
  revalidatePath("/projects", "layout");
}

export async function updateProject(id: string, data: any) {
  if (!(await isAdmin())) throw new Error("Unauthorized");
  await prisma.project.update({ where: { id }, data });
  revalidatePath("/projects", "layout");
}

export async function deleteProject(id: string) {
  if (!(await isAdmin())) throw new Error("Unauthorized");
  await prisma.project.delete({ where: { id } });
  revalidatePath("/projects", "layout");
}

export async function upsertCertification(data: any) {
  if (!(await isAdmin())) throw new Error("Unauthorized");
  if (data.id) {
    await prisma.certification.update({ where: { id: data.id }, data });
  } else {
    await prisma.certification.create({ data });
  }
  revalidatePath("/about");
}

export async function deleteCertification(id: string) {
  if (!(await isAdmin())) throw new Error("Unauthorized");
  await prisma.certification.delete({ where: { id } });
  revalidatePath("/about");
}

export async function createSkill(data: {
  label: string;
  iconType: string;
  orbitLevel: number;
  showInOrbit: boolean;
  showInSnippet: boolean;
  aboutCategory?: string | null;
}) {
  if (!(await isAdmin())) throw new Error("Unauthorized");
  await prisma.skill.create({ data });
  revalidatePath("/");
}

export async function updateSkill(id: string, data: any) {
  if (!(await isAdmin())) throw new Error("Unauthorized");
  await prisma.skill.update({ where: { id }, data });
  revalidatePath("/");
}

export async function deleteSkill(id: string) {
  if (!(await isAdmin())) throw new Error("Unauthorized");
  await prisma.skill.delete({ where: { id } });
  revalidatePath("/");
}

export async function reorderSkills(items: { id: string; order: number }[]) {
  if (!(await isAdmin())) throw new Error("Unauthorized");
  await prisma.$transaction(
    items.map((item) =>
      prisma.skill.update({
        where: { id: item.id },
        data: { order: item.order },
      })
    )
  );
  revalidatePath("/");
}

export async function upsertSiteConfig(key: string, value: string) {
  if (!(await isAdmin())) throw new Error("Unauthorized");
  await prisma.siteConfig.upsert({
    where: { id: key },
    update: { value },
    create: { id: key, value },
  });
  revalidatePath("/", "layout");
}

// Education Actions
export async function createEducation(data: {
  degree: string;
  school: string;
  period: string;
  description: string;
}) {
  if (!(await isAdmin())) throw new Error("Unauthorized");
  await prisma.education.create({ data });
  revalidatePath("/about");
}

export async function updateEducation(
  id: string,
  data: {
    degree: string;
    school: string;
    period: string;
    description: string;
  }
) {
  if (!(await isAdmin())) throw new Error("Unauthorized");
  await prisma.education.update({
    where: { id },
    data,
  });
  revalidatePath("/about");
}

export async function deleteEducation(id: string) {
  if (!(await isAdmin())) throw new Error("Unauthorized");
  await prisma.education.delete({ where: { id } });
  revalidatePath("/about");
}

export async function reorderEducation(items: { id: string; order: number }[]) {
  if (!(await isAdmin())) throw new Error("Unauthorized");
  
  await prisma.$transaction(
    items.map((item) =>
      prisma.education.update({
        where: { id: item.id },
        data: { order: item.order },
      })
    )
  );
  
  revalidatePath("/about");
}

export async function uploadImage(formData: FormData) {
  if (!(await isAdmin())) throw new Error("Unauthorized");
  
  const file = formData.get("file") as File;
  if (!file) throw new Error("No file provided");

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ext = file.name.split('.').pop();
  
  // Dynamic import of node modules to prevent issues with edge runtime
  const { v4: uuidv4 } = await import("uuid");
  const { writeFile, mkdir } = await import("fs/promises");
  const { join } = await import("path");

  const fileName = `${uuidv4()}.${ext}`;
  const uploadDir = join(process.cwd(), "public/uploads");
  
  try {
    await mkdir(uploadDir, { recursive: true });
  } catch {
    // ignore directory exists error
  }

  const path = join(uploadDir, fileName);
  await writeFile(path, buffer);
  
  return `/uploads/${fileName}`;
}

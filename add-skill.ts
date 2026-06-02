import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const lastSkill = await prisma.skill.findFirst({
    orderBy: { order: 'desc' }
  });
  
  await prisma.skill.create({
    data: {
      label: "Hugging Face",
      iconType: "huggingface",
      orbitLevel: 3,
      enabled: true,
      order: (lastSkill?.order || 0) + 1,
    }
  });
  console.log("Added Hugging Face skill");
}

main().catch(console.error).finally(() => prisma.$disconnect());

import { getSkills } from "@/lib/content-fetchers";
import SkillsManager from "./SkillsManager";

export default async function SkillsAdminPage() {
  const skills = await getSkills();

  return (
    <div className="max-w-4xl">
      <h1 className="mb-8 text-3xl font-bold text-white">Skills</h1>
      <SkillsManager initialData={skills} />
    </div>
  );
}

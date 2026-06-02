import { getWorkExperience } from "@/lib/content-fetchers";
import WorkExpManager from "./WorkExpManager";

export default async function WorkExpAdminPage() {
  const exps = await getWorkExperience();

  return (
    <div className="max-w-4xl">
      <h1 className="mb-8 text-3xl font-bold text-white">Work Experience</h1>
      <WorkExpManager initialData={exps} />
    </div>
  );
}

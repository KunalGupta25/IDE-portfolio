import { getEducation } from "@/lib/content-fetchers";
import EducationManager from "./EducationManager";

export default async function EducationAdminPage() {
  const education = await getEducation();

  return (
    <div className="max-w-4xl">
      <h1 className="mb-8 text-3xl font-bold text-white">Education Manager</h1>
      <div className="mb-6 rounded-lg bg-gray-800 p-6">
        <p className="text-gray-400">
          Manage your education history. You can add new degrees, edit existing ones, 
          and drag them up or down to reorder how they appear on the About page.
        </p>
      </div>
      <EducationManager initialData={education} />
    </div>
  );
}

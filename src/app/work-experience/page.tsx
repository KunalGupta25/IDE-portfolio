import WorkHistory from "./components/work-history";
import { getWorkExperience } from "@/lib/content-fetchers";

export default async function WorkExperiencePage() {
  const experiences = await getWorkExperience();
  return <WorkHistory workHistory={experiences} />;
}

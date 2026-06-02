import { getProfile } from "@/lib/content-fetchers";
import AboutManager from "./AboutManager";

export default async function AboutAdminPage() {
  const profile = await getProfile();

  return (
    <div className="max-w-4xl">
      <h1 className="mb-8 text-3xl font-bold text-white">About Page Content</h1>
      <AboutManager initialData={profile} />
    </div>
  );
}

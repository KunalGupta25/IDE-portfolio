import { getProfile } from "@/lib/content-fetchers";
import ProfileForm from "./ProfileForm";

export default async function ProfileAdminPage() {
  const profile = await getProfile();

  return (
    <div className="max-w-3xl">
      <h1 className="mb-8 text-3xl font-bold text-white">Edit Profile</h1>
      <ProfileForm initialData={profile} />
    </div>
  );
}

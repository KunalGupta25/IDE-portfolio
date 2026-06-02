import { getProfile, getSkills } from "@/lib/content-fetchers";
import { HomeClient } from "@/components/HomeClient";

export default async function Home() {
  const profile = await getProfile();
  const allSkills = await getSkills();
  const orbitSkills = allSkills.filter((s) => s.showInOrbit);

  return (
    <HomeClient profile={profile} skills={orbitSkills} />
  );
}

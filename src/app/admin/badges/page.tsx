import { getBadges } from "@/lib/content-fetchers";
import BadgeManager from "./BadgeManager";

export default async function BadgesAdminPage() {
  const badges = await getBadges();

  return (
    <div className="max-w-4xl">
      <h1 className="mb-8 text-3xl font-bold text-white">Badges</h1>
      <BadgeManager initialData={badges} />
    </div>
  );
}

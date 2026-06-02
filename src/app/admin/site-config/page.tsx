import { getSiteConfig } from "@/lib/content-fetchers";
import SiteConfigManager from "./SiteConfigManager";

export default async function SiteConfigAdminPage() {
  // Fetch all known configs
  const siteTitle = await getSiteConfig("siteTitle");
  const githubBranch = await getSiteConfig("githubBranch");
  const wakatimeBadgeUrl = await getSiteConfig("wakatimeBadgeUrl");

  const configData = {
    siteTitle,
    githubBranch,
    wakatimeBadgeUrl,
  };

  return (
    <div className="max-w-3xl">
      <h1 className="mb-8 text-3xl font-bold text-white">Site Configuration</h1>
      <SiteConfigManager initialData={configData} />
    </div>
  );
}

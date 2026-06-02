import { getCertifications } from "@/lib/content-fetchers";
import CertificationsManager from "./CertificationsManager";

export default async function CertificationsAdminPage() {
  const certs = await getCertifications();

  return (
    <div className="max-w-4xl">
      <h1 className="mb-8 text-3xl font-bold text-white">Certifications</h1>
      <CertificationsManager initialData={certs} />
    </div>
  );
}

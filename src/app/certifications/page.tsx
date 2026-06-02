import { getCertifications } from "@/lib/content-fetchers";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certifications | Kunal Gupta",
  description: "View my professional certifications",
};

export default async function CertificationsPage() {
  const certs = await getCertifications();

  return (
    <div className="p-4 text-gray-300 max-w-7xl mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-slate-200">Certifications</h1>
      
      {certs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {certs.map((cert) => (
            <a 
              key={cert.id} 
              href={cert.link || "#"} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block group relative rounded-xl border border-gray-700 bg-gray-800/50 p-4 transition-all hover:bg-gray-800 hover:border-gray-600"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-900 mb-4">
                <Image 
                  src={cert.image} 
                  alt={cert.name} 
                  fill
                  className="object-contain p-2 transition-transform duration-300 group-hover:scale-105" 
                />
              </div>
              <h2 className="text-lg font-semibold text-slate-200 line-clamp-2 text-center group-hover:text-blue-400 transition-colors">
                {cert.name}
              </h2>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-slate-400">No certifications available to display.</p>
      )}
    </div>
  );
}

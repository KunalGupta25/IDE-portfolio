"use client";

import { GitBranchIcon } from "lucide-react";
import { SiSalesforce, SiLinkedin } from "react-icons/si";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTabsContext } from "@/contexts/TabsContext";
import { useState, useEffect } from "react";
import { VscodeIconsFileTypeDotenv } from "../Icons/VscodeIconsFileTypeDotenv";

function LastUpdated() {
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    async function fetchLastUpdated() {
      try {
        const response = await fetch("/api/last-updated");
        const data = await response.json();
        setLastUpdated(data.lastUpdated);
      } catch (error) {
        console.error("Error fetching last updated time:", error);
      }
    }
    fetchLastUpdated();
  }, []);

  if (!lastUpdated) return null;

  return (
    <div className="flex items-center gap-1">
      <span>Last Updated: {lastUpdated}</span>
    </div>
  );
}

export function Footer({ config }: { config?: any }) {
  const router = useRouter();
  const { addTab } = useTabsContext();

  const handleStatsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    addTab({
      name: "coding-stats.env",
      path: "/coding-stats",
      icon: VscodeIconsFileTypeDotenv,
    });
    router.push("/coding-stats");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 flex h-6 items-center justify-between border-t border-gray-800 bg-[#1f1f1f] px-3 text-[11px] text-gray-400">
      <div className="flex items-center gap-3">
        <Image src="/PC_Favicon.png" alt="PC Logo" width={16} height={16} />
        {config?.githubUrl && (
          <Link
            href={config.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-gray-300"
          >
            <GitBranchIcon size={12} />
            <span>{config?.githubBranch || "main"}</span>
          </Link>
        )}
        {config?.salesforceUrl && (
          <Link
            href={config.salesforceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-gray-300"
          >
            <SiSalesforce size={14} />
          </Link>
        )}
        {config?.linkedinUrl && (
          <Link
            href={config.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-gray-300"
          >
            <SiLinkedin size={14} />
          </Link>
        )}
        <Link
          href="/coding-stats"
          className="flex items-center hover:text-gray-300"
          title="Coding Stats"
          onClick={handleStatsClick}
        >
          {config?.wakatimeBadgeUrl && (
            <Image
              src={config.wakatimeBadgeUrl}
              alt="Total time coded"
              width={100}
              height={16}
              className="h-4 w-auto"
            />
          )}
        </Link>
        <LastUpdated />
      </div>
      <div className="flex items-center gap-3">
        <span>TypeScript</span>
        <span>UTF-8</span>
        <span>LF</span>
      </div>
    </div>
  );
}

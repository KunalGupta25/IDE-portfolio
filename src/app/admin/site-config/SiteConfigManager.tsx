"use client";

import { useState } from "react";
import { upsertSiteConfig } from "@/lib/admin-actions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function SiteConfigManager({ initialData }: { initialData: Record<string, string> }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    try {
      // Upsert each key
      for (const [key, value] of Object.entries(data)) {
        await upsertSiteConfig(key, value as string);
      }
      toast.success("Site configuration updated successfully!");
    } catch (err) {
      toast.error("Failed to update site configuration.");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: "siteTitle", label: "IDE Window Title", type: "text", default: "Portfolio - VS Code" },
    { name: "githubBranch", label: "GitHub Branch Name (Footer)", type: "text", default: "main" },
    { name: "wakatimeBadgeUrl", label: "WakaTime Badge Image URL (Footer)", type: "text", default: "" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {fields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className="mb-2 block text-sm font-medium text-gray-300">
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              id={field.name}
              defaultValue={initialData[field.name] || field.default}
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white">
          {loading ? "Saving..." : "Save Config"}
        </Button>
      </div>
    </form>
  );
}

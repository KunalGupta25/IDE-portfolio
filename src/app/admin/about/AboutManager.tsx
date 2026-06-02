"use client";

import { useState } from "react";
import { updateProfile } from "@/lib/admin-actions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

export default function AboutManager({ initialData }: { initialData: any }) {
  const [loading, setLoading] = useState(false);
  const [mdContent, setMdContent] = useState(initialData.aboutContent || initialData.bioExtended || initialData.bio || "");

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProfile({ aboutContent: mdContent });
      toast.success("About page content updated successfully!");
    } catch {
      toast.error("Failed to update about page content.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6 rounded-lg bg-gray-800 p-6">
        <p className="text-gray-400">
          Write your extended About Me page content here using Markdown. 
          This content will be shown on the `/about` route.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 rounded-lg border border-gray-600 bg-gray-800 p-6">
        <div data-color-mode="dark" className="md-editor-fix">
          <label className="mb-2 block text-sm font-medium text-gray-300">
            About Content (Markdown)
          </label>
          <MDEditor
            value={mdContent}
            onChange={(val) => setMdContent(val || "")}
            previewOptions={{ rehypePlugins: [[rehypeSanitize]] }}
            className="min-h-[400px]"
          />
          <style jsx global>{`
            .md-editor-fix textarea,
            .md-editor-fix .w-md-editor-text-pre,
            .md-editor-fix .w-md-editor-text-pre > code {
              font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !important;
              font-size: 14px !important;
              line-height: 24px !important;
              letter-spacing: normal !important;
              word-spacing: normal !important;
            }
          `}</style>
        </div>
        
        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white">
            {loading ? "Saving..." : "Save Content"}
          </Button>
        </div>
      </form>
    </div>
  );
}

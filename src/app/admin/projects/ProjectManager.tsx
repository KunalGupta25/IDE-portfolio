"use client";

import { useState } from "react";
import { updateProject, createProject, deleteProject } from "@/lib/admin-actions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Edit } from "lucide-react";
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from "rehype-sanitize";

export default function ProjectManager({ initialData }: { initialData: any[] }) {
  const [projects, setProjects] = useState(initialData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mdContent, setMdContent] = useState("");

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteProject(id);
      setProjects(projects.filter(p => p.id !== id));
      toast.success("Deleted successfully");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>, id?: string) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    let rawImage = formData.get("image") as string;
    let normalizedImage = rawImage?.replace(/\\/g, "/") || "";
    if (normalizedImage && !normalizedImage.startsWith("http") && !normalizedImage.startsWith("/") && !normalizedImage.startsWith("data:")) {
      normalizedImage = `/${normalizedImage}`;
    }

    const data = {
      slug: formData.get("slug") as string,
      title: formData.get("title") as string,
      summary: formData.get("summary") as string,
      technology: "",
      image: normalizedImage,
      liveUrl: formData.get("liveUrl") as string,
      githubUrl: formData.get("githubUrl") as string,
      content: mdContent,
    };

    try {
      if (id) {
        await updateProject(id, data);
        setProjects(projects.map(p => p.id === id ? { ...p, ...data } : p));
        setEditingId(null);
        toast.success("Updated successfully");
      } else {
        await createProject({ ...data, order: projects.length });
        toast.success("Created successfully. Please refresh to see changes.");
        setIsAdding(false);
      }
    } catch {
      toast.error("Failed to save");
    } finally {
      setLoading(false);
    }
  };

  const FormEditor = ({ project, isNew = false }: { project?: any, isNew?: boolean }) => {
    // Initialise MD content once when editor opens
    if (project?.content && mdContent === "" && !isNew) {
      setMdContent(project.content);
    }

    return (
      <form onSubmit={(e) => handleSave(e, project?.id)} className="space-y-4 rounded-lg border border-gray-600 bg-gray-800 p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm text-gray-400">Title</label>
            <input required name="title" defaultValue={project?.title} className="w-full rounded border border-gray-600 bg-gray-700 px-3 py-1.5 text-white" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-400">Slug</label>
            <input required name="slug" defaultValue={project?.slug} className="w-full rounded border border-gray-600 bg-gray-700 px-3 py-1.5 text-white" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-400">Image Path / URL</label>
            <input name="image" defaultValue={project?.image} className="w-full rounded border border-gray-600 bg-gray-700 px-3 py-1.5 text-white" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-400">Live URL</label>
            <input name="liveUrl" defaultValue={project?.liveUrl} className="w-full rounded border border-gray-600 bg-gray-700 px-3 py-1.5 text-white" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-400">GitHub URL</label>
            <input name="githubUrl" defaultValue={project?.githubUrl} className="w-full rounded border border-gray-600 bg-gray-700 px-3 py-1.5 text-white" />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm text-gray-400">Summary (Short description)</label>
          <textarea required name="summary" defaultValue={project?.summary} rows={2} className="w-full rounded border border-gray-600 bg-gray-700 px-3 py-1.5 text-white" />
        </div>
        <div data-color-mode="dark">
          <label className="mb-1 block text-sm text-gray-400">Content (Markdown)</label>
          <MDEditor
            value={mdContent}
            onChange={(val) => setMdContent(val || "")}
            previewOptions={{ rehypePlugins: [[rehypeSanitize]] }}
            className="min-h-[400px]"
          />
        </div>
        <div className="flex gap-2">
          <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white">Save</Button>
          <Button type="button" variant="outline" onClick={() => { if (isNew) setIsAdding(false); else setEditingId(null); setMdContent(""); }} className="text-gray-900">Cancel</Button>
        </div>
      </form>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Projects</h2>
        {!(isAdding || editingId) && (
          <Button onClick={() => { setIsAdding(true); setMdContent(""); }} className="bg-green-600 hover:bg-green-700 text-white">Add New Project</Button>
        )}
      </div>
      
      {isAdding && <FormEditor isNew />}

      {editingId && (
        <FormEditor project={projects.find(p => p.id === editingId)} />
      )}

      {!(isAdding || editingId) && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {projects.map((project) => (
            <div key={project.id}>
              <Card className="flex flex-col border-gray-700 bg-gray-800 p-4 h-full">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-white text-lg">{project.title}</h3>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-blue-400" onClick={() => { setEditingId(project.id); setMdContent(project.content); }}>
                      <Edit size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-400" onClick={() => handleDelete(project.id)}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-gray-400 flex-1">{project.summary}</p>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

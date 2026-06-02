"use client";

import { useState } from "react";
import { updateSkill, createSkill, deleteSkill, reorderSkills } from "@/lib/admin-actions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2 } from "lucide-react";

export default function SkillsManager({ initialData }: { initialData: any[] }) {
  const [skills, setSkills] = useState(initialData);
  const [activeTab, setActiveTab] = useState<"orbital" | "snippet" | "about">("orbital");
  const [loading, setLoading] = useState(false);

  // Orbital
  const orbitalSkills = skills.filter((s) => s.iconType !== "none");

  // Snippet
  const snippetSkills = skills.filter((s) => s.showInSnippet);
  const [newSnippetSkill, setNewSnippetSkill] = useState("");

  // About Categorical
  const aboutSkills = skills.filter((s) => s.aboutCategory);
  const categories = ["Languages", "Frameworks", "AI/ML", "Database", "Tools"];
  const [newAboutSkill, setNewAboutSkill] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const handleToggleOrbit = async (id: string, currentStatus: boolean) => {
    try {
      await updateSkill(id, { showInOrbit: !currentStatus });
      setSkills(skills.map((s) => (s.id === id ? { ...s, showInOrbit: !currentStatus } : s)));
      toast.success("Orbital status updated");
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this skill?")) return;
    try {
      await deleteSkill(id);
      setSkills(skills.filter((s) => s.id !== id));
      toast.success("Skill deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleAddSnippetSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSnippetSkill.trim()) return;
    setLoading(true);
    try {
      await createSkill({
        label: newSnippetSkill.trim(),
        iconType: "none",
        orbitLevel: 0,
        showInOrbit: false,
        showInSnippet: true,
      });
      toast.success("Skill added to snippet. Please refresh.");
      setNewSnippetSkill("");
    } catch {
      toast.error("Failed to add skill");
    } finally {
      setLoading(false);
    }
  };

  const handleAddAboutSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAboutSkill.trim()) return;
    setLoading(true);
    try {
      await createSkill({
        label: newAboutSkill.trim(),
        iconType: "none",
        orbitLevel: 0,
        showInOrbit: false,
        showInSnippet: false,
        aboutCategory: selectedCategory,
      });
      toast.success("Categorical skill added. Please refresh.");
      setNewAboutSkill("");
    } catch {
      toast.error("Failed to add skill");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex space-x-2 border-b border-gray-700 pb-2">
        <button
          onClick={() => setActiveTab("orbital")}
          className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${activeTab === "orbital" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}`}
        >
          Orbital Homepage
        </button>
        <button
          onClick={() => setActiveTab("snippet")}
          className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${activeTab === "snippet" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}`}
        >
          Code Snippet
        </button>
        <button
          onClick={() => setActiveTab("about")}
          className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${activeTab === "about" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}`}
        >
          About Me Categories
        </button>
      </div>

      {/* Tab 1: Orbital Skills */}
      {activeTab === "orbital" && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
          <div className="rounded-lg bg-gray-800 p-6 border border-gray-700">
            <p className="text-gray-400">
              Toggle the visibility of your skills on the Orbiting Skills component (Homepage). Note: Changing standard IDs or icons requires code updates in the skills mapping config.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {orbitalSkills.map((skill) => (
              <Card key={skill.id} className="flex flex-col items-center justify-between border-gray-700 bg-gray-800 p-4 text-center">
                <h3 className="mb-4 font-semibold text-white">{skill.label}</h3>
                <Button
                  variant={skill.showInOrbit ? "default" : "secondary"}
                  className={skill.showInOrbit ? "bg-green-600 hover:bg-green-700 text-white w-full" : "w-full text-gray-900"}
                  onClick={() => handleToggleOrbit(skill.id, skill.showInOrbit)}
                >
                  {skill.showInOrbit ? "Visible" : "Hidden"}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Code Snippet */}
      {activeTab === "snippet" && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
          <div className="rounded-lg bg-gray-800 p-6 border border-gray-700">
            <p className="text-gray-400 mb-4">
              Manage the skills that appear in the TypeScript `Developer` code snippet on your About page.
            </p>
            <form onSubmit={handleAddSnippetSkill} className="flex gap-2 max-w-md">
              <input
                required
                value={newSnippetSkill}
                onChange={(e) => setNewSnippetSkill(e.target.value)}
                placeholder="e.g. Next.js"
                className="flex-1 rounded border border-gray-600 bg-gray-700 px-3 py-2 text-white"
              />
              <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white">
                Add Skill
              </Button>
            </form>
          </div>

          <div className="flex flex-wrap gap-2">
            {snippetSkills.map((skill) => (
              <div key={skill.id} className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-full pl-4 pr-1 py-1">
                <span className="text-gray-300 text-sm font-medium">{skill.label}</span>
                <button onClick={() => handleDelete(skill.id)} className="p-1.5 hover:bg-red-500/20 text-red-400 rounded-full transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: About Me Categorical */}
      {activeTab === "about" && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
          <div className="rounded-lg bg-gray-800 p-6 border border-gray-700">
            <p className="text-gray-400 mb-4">
              Add skills to display below your "About Me" section, grouped by category.
            </p>
            <form onSubmit={handleAddAboutSkill} className="flex gap-2 max-w-2xl">
              <input
                required
                value={newAboutSkill}
                onChange={(e) => setNewAboutSkill(e.target.value)}
                placeholder="e.g. Python"
                className="flex-1 rounded border border-gray-600 bg-gray-700 px-3 py-2 text-white"
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded border border-gray-600 bg-gray-700 px-3 py-2 text-white w-48"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white">
                Add to Category
              </Button>
            </form>
          </div>

          <div className="space-y-8">
            {categories.map((category) => {
              const categorySkills = aboutSkills.filter((s) => s.aboutCategory === category);
              if (categorySkills.length === 0) return null;
              return (
                <div key={category}>
                  <h3 className="text-lg font-bold text-white mb-3 border-b border-gray-700 pb-2">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill) => (
                      <div key={skill.id} className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-md pl-3 pr-1 py-1">
                        <span className="text-gray-300 text-sm">{skill.label}</span>
                        <button onClick={() => handleDelete(skill.id)} className="p-1 hover:bg-red-500/20 text-red-400 rounded transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

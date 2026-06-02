"use client";

import { useState } from "react";
import { updateWorkExperience, createWorkExperience, deleteWorkExperience, reorderWorkExperience } from "@/lib/admin-actions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown, Trash2, Edit } from "lucide-react";

export default function WorkExpManager({ initialData }: { initialData: any[] }) {
  const [experiences, setExperiences] = useState(initialData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === experiences.length - 1) return;

    const newExps = [...experiences];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap
    [newExps[index], newExps[targetIndex]] = [newExps[targetIndex], newExps[index]];
    setExperiences(newExps);

    try {
      await reorderWorkExperience(newExps.map(e => e.id));
      toast.success("Reordered successfully");
    } catch {
      toast.error("Failed to reorder");
      setExperiences(initialData); // Revert
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;
    try {
      await deleteWorkExperience(id);
      setExperiences(experiences.filter(e => e.id !== id));
      toast.success("Deleted successfully");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>, id?: string) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      period: formData.get("period") as string,
      role: formData.get("role") as string,
      company: formData.get("company") as string,
      description: formData.get("description") as string,
    };

    try {
      if (id) {
        await updateWorkExperience(id, data);
        setExperiences(experiences.map(exp => exp.id === id ? { ...exp, ...data } : exp));
        setEditingId(null);
        toast.success("Updated successfully");
      } else {
        await createWorkExperience({ ...data, order: experiences.length });
        toast.success("Created successfully. Please refresh to see changes.");
        setIsAdding(false);
      }
    } catch {
      toast.error("Failed to save");
    } finally {
      setLoading(false);
    }
  };

  const FormEditor = ({ exp, isNew = false }: { exp?: any, isNew?: boolean }) => (
    <form onSubmit={(e) => handleSave(e, exp?.id)} className="space-y-4 rounded-lg border border-gray-600 bg-gray-800 p-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm text-gray-400">Role</label>
          <input required name="role" defaultValue={exp?.role} className="w-full rounded border border-gray-600 bg-gray-700 px-3 py-1.5 text-white" />
        </div>
        <div>
          <label className="mb-1 block text-sm text-gray-400">Company</label>
          <input required name="company" defaultValue={exp?.company} className="w-full rounded border border-gray-600 bg-gray-700 px-3 py-1.5 text-white" />
        </div>
        <div>
          <label className="mb-1 block text-sm text-gray-400">Period</label>
          <input required name="period" defaultValue={exp?.period} className="w-full rounded border border-gray-600 bg-gray-700 px-3 py-1.5 text-white" />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm text-gray-400">Description</label>
        <textarea required name="description" defaultValue={exp?.description} rows={3} className="w-full rounded border border-gray-600 bg-gray-700 px-3 py-1.5 text-white" />
      </div>
      <div className="flex gap-2">
        <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white">Save</Button>
        <Button type="button" variant="outline" onClick={() => isNew ? setIsAdding(false) : setEditingId(null)} className="text-gray-900">Cancel</Button>
      </div>
    </form>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Entries</h2>
        <Button onClick={() => setIsAdding(true)} className="bg-green-600 hover:bg-green-700 text-white">Add New Entry</Button>
      </div>
      
      {isAdding && <FormEditor isNew />}

      <div className="space-y-4">
        {experiences.map((exp, index) => (
          <div key={exp.id}>
            {editingId === exp.id ? (
              <FormEditor exp={exp} />
            ) : (
              <Card className="flex items-center justify-between border-gray-700 bg-gray-800 p-4">
                <div>
                  <h3 className="font-semibold text-white">{exp.role} <span className="font-normal text-gray-400">at {exp.company}</span></h3>
                  <p className="text-sm text-gray-500">{exp.period}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex flex-col">
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400" disabled={index === 0} onClick={() => handleMove(index, 'up')}>
                      <ArrowUp size={14} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400" disabled={index === experiences.length - 1} onClick={() => handleMove(index, 'down')}>
                      <ArrowDown size={14} />
                    </Button>
                  </div>
                  <Button variant="ghost" size="icon" className="text-blue-400" onClick={() => setEditingId(exp.id)}>
                    <Edit size={16} />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-400" onClick={() => handleDelete(exp.id)}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              </Card>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

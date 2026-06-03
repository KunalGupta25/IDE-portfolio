"use client";

import { useState } from "react";
import { addBadge, updateBadge, deleteBadge } from "@/lib/admin-actions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Edit } from "lucide-react";
import Image from "next/image";

export default function BadgeManager({ initialData }: { initialData: any[] }) {
  const [badges, setBadges] = useState(initialData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this badge?")) return;
    try {
      await deleteBadge(id);
      setBadges(badges.filter(b => b.id !== id));
      toast.success("Deleted successfully");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>, id?: string) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      const data = {
        name: formData.get("name") as string,
        link: formData.get("link") as string,
        image: formData.get("imageUrl") as string,
      };

      if (id) {
        await updateBadge(id, data);
        setBadges(badges.map(b => b.id === id ? { ...b, ...data } : b));
        setEditingId(null);
        toast.success("Updated successfully");
      } else {
        await addBadge({ ...data, order: badges.length });
        toast.success("Created successfully. Please refresh to see changes.");
        setIsAdding(false);
      }
    } catch {
      toast.error("Failed to save");
    } finally {
      setLoading(false);
    }
  };

  const FormEditor = ({ badge, isNew = false }: { badge?: any, isNew?: boolean }) => (
    <form onSubmit={(e) => handleSave(e, badge?.id)} className="space-y-4 rounded-lg border border-gray-600 bg-gray-800 p-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm text-gray-400">Badge Name</label>
          <input required name="name" defaultValue={badge?.name} className="w-full rounded border border-gray-600 bg-gray-700 px-3 py-1.5 text-white" />
        </div>
        <div>
          <label className="mb-1 block text-sm text-gray-400">Verification Link URL</label>
          <input name="link" defaultValue={badge?.link} className="w-full rounded border border-gray-600 bg-gray-700 px-3 py-1.5 text-white" />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm text-gray-400">Image URL</label>
        <input required name="imageUrl" defaultValue={badge?.image} className="w-full rounded border border-gray-600 bg-gray-700 px-3 py-1.5 text-white" placeholder="https://..." />
        {badge?.image && badge.image.trim() !== "" && (
          <div className="mt-2">
            <span className="text-xs text-gray-400">Current Image:</span>
            <Image src={badge.image} alt="preview" width={100} height={100} className="mt-1 rounded" />
          </div>
        )}
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
        <Button onClick={() => setIsAdding(true)} className="bg-green-600 hover:bg-green-700 text-white">Add New Badge</Button>
      </div>
      
      {isAdding && <FormEditor isNew />}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {badges.map((badge) => (
          <div key={badge.id}>
            {editingId === badge.id ? (
              <FormEditor badge={badge} />
            ) : (
              <Card className="flex flex-col items-center border-gray-700 bg-gray-800 p-4 text-center">
                {badge.image ? (
                  <Image src={badge.image} alt={badge.name} width={100} height={100} className="mb-4 rounded-lg" />
                ) : (
                  <div className="mb-4 flex h-[100px] w-[100px] items-center justify-center rounded-lg bg-gray-700 text-xs text-gray-400">No Image</div>
                )}
                <h3 className="font-semibold text-white mb-2">{badge.name}</h3>
                <div className="mt-auto flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="text-blue-400" onClick={() => setEditingId(badge.id)}>
                    <Edit size={16} />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-400" onClick={() => handleDelete(badge.id)}>
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

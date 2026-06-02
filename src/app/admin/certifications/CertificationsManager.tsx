"use client";

import { useState } from "react";
import { upsertCertification, deleteCertification, uploadImage } from "@/lib/admin-actions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Edit } from "lucide-react";
import Image from "next/image";

export default function CertificationsManager({ initialData }: { initialData: any[] }) {
  const [certs, setCerts] = useState(initialData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this certification?")) return;
    try {
      await deleteCertification(id);
      setCerts(certs.filter(c => c.id !== id));
      toast.success("Deleted successfully");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>, id?: string) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;
    
    let imageUrl = formData.get("existingImage") as string;
    
    try {
      if (file && file.size > 0) {
        const uploadFormData = new FormData();
        uploadFormData.append("file", file);
        imageUrl = await uploadImage(uploadFormData);
      }

      const data = {
        name: formData.get("name") as string,
        link: formData.get("link") as string,
        image: imageUrl,
      };

      if (id) {
        await upsertCertification({ id, ...data });
        setCerts(certs.map(c => c.id === id ? { ...c, ...data } : c));
        setEditingId(null);
        toast.success("Updated successfully");
      } else {
        await upsertCertification({ ...data, order: certs.length });
        toast.success("Created successfully. Please refresh to see changes.");
        setIsAdding(false);
      }
    } catch {
      toast.error("Failed to save");
    } finally {
      setLoading(false);
    }
  };

  const FormEditor = ({ cert, isNew = false }: { cert?: any, isNew?: boolean }) => (
    <form onSubmit={(e) => handleSave(e, cert?.id)} className="space-y-4 rounded-lg border border-gray-600 bg-gray-800 p-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm text-gray-400">Certification Name</label>
          <input required name="name" defaultValue={cert?.name} className="w-full rounded border border-gray-600 bg-gray-700 px-3 py-1.5 text-white" />
        </div>
        <div>
          <label className="mb-1 block text-sm text-gray-400">Verification Link URL</label>
          <input name="link" defaultValue={cert?.link} className="w-full rounded border border-gray-600 bg-gray-700 px-3 py-1.5 text-white" />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm text-gray-400">Upload Image</label>
        <input type="file" name="file" accept="image/*" className="w-full text-white" />
        <input type="hidden" name="existingImage" value={cert?.image || ""} />
        {cert?.image && (
          <div className="mt-2">
            <span className="text-xs text-gray-400">Current Image:</span>
            <Image src={cert.image} alt="preview" width={100} height={100} className="mt-1 rounded" />
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
        <Button onClick={() => setIsAdding(true)} className="bg-green-600 hover:bg-green-700 text-white">Add New Certification</Button>
      </div>
      
      {isAdding && <FormEditor isNew />}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certs.map((cert) => (
          <div key={cert.id}>
            {editingId === cert.id ? (
              <FormEditor cert={cert} />
            ) : (
              <Card className="flex flex-col items-center border-gray-700 bg-gray-800 p-4 text-center">
                <Image src={cert.image} alt={cert.name} width={100} height={100} className="mb-4 rounded-lg" />
                <h3 className="font-semibold text-white mb-2">{cert.name}</h3>
                <div className="mt-auto flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="text-blue-400" onClick={() => setEditingId(cert.id)}>
                    <Edit size={16} />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-400" onClick={() => handleDelete(cert.id)}>
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

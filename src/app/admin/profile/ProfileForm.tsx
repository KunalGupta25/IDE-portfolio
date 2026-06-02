"use client";

import { useState } from "react";
import { updateProfile } from "@/lib/admin-actions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function ProfileForm({ initialData }: { initialData: any }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    try {
      await updateProfile(data);
      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: "name", label: "Full Name", type: "text" },
    { name: "title", label: "Job Title", type: "text" },
    { name: "tagline", label: "Tagline", type: "textarea", rows: 2 },
    { name: "bio", label: "Short Bio", type: "textarea", rows: 4 },
    { name: "bioExtended", label: "Extended Bio", type: "textarea", rows: 4 },
    { name: "currentCompany", label: "Current Company (For Code Snippet)", type: "text" },
    { name: "yearsOfExperience", label: "Years of Experience (For Code Snippet)", type: "number" },
    { name: "location", label: "Location", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: "Phone", type: "text" },
    { name: "availability", label: "Availability", type: "text" },
    { name: "githubUrl", label: "GitHub URL", type: "text" },
    { name: "linkedinUrl", label: "LinkedIn URL", type: "text" },
    { name: "salesforceUrl", label: "Salesforce URL", type: "text" },
    { name: "portfolioUrl", label: "Portfolio URL", type: "text" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {fields.map((field) => (
          <div key={field.name} className={field.type === "textarea" ? "md:col-span-2" : ""}>
            <label htmlFor={field.name} className="mb-2 block text-sm font-medium text-gray-300">
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                id={field.name}
                defaultValue={initialData[field.name]}
                rows={field.rows}
                className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                id={field.name}
                defaultValue={initialData[field.name]}
                className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white">
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}

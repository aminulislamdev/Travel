"use client";

import { useState, useRef } from "react";
import { useSession, updateUser } from "@/lib/auth-client";
import { Pencil, Save, X, Upload, Loader2 } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

type ExtendedUser = {
  name?: string;
  image?: string | null;
  nationality?: string;
};

export default function EditProfileDialog() {
  const { data: session } = useSession();
  const user = session?.user as unknown as ExtendedUser;

  const [isOpen, setIsOpen] = useState(false);

  // ইউজারের নাম, ছবি এবং জাতীয়তার স্টেট
  const [editName, setEditName] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editNationality, setEditNationality] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 👇 ছবি আপলোড করার ফাংশন (ImageBB API)
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setEditImage(data.data.url); // সফল হলে লিংক স্টেটে সেভ হবে
      } else {
        alert("Image upload failed!");
      }
    } catch (error) {
      console.error(error);
      alert("Error uploading image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const { error } = await updateUser({
        name: editName,
        image: editImage,
        // @ts-expect-error - Better Auth custom field
        nationality: editNationality,
      });

      if (error) throw new Error(error.message);

      setIsOpen(false);
      window.location.reload();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong";
      alert("Failed to update: " + errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (open) {
          setEditName(user?.name || "");
          setEditImage(user?.image || "");
          setEditNationality(user?.nationality || "");
        }
        setIsOpen(open);
      }}
    >
      <DialogTrigger
        render={<button type="button" className="w-full mt-6 bg-[#00a6c0] text-white py-3 rounded-md text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#00879c] transition">
          <Pencil size={16} />
          Edit Profile
        </button>}
      />

      <DialogContent className="sm:max-w-106.25 p-6">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-semibold">Edit Profile</DialogTitle>
          <DialogDescription>Update your profile details and picture.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleUpdateProfile} className="space-y-4">

          {/* 👇 ছবি আপলোড সেকশন */}
          <div className="flex flex-col items-center justify-center mb-4">
            <div
              className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 cursor-pointer group bg-gray-50 flex items-center justify-center"
              onClick={() => fileInputRef.current?.click()}
            >
              {editImage ? (
                <Image src={editImage} alt="Profile" fill className="object-cover" />
              ) : (
                <Upload className="text-gray-400" size={24} />
              )}

              {/* হোভার করলে ওভারলে দেখাবে */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                {isUploading ? (
                  <Loader2 className="text-white animate-spin" size={24} />
                ) : (
                  <Upload className="text-white" size={24} />
                )}
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Click to upload new picture</p>

            {/* হিডেন ফাইল ইনপুট */}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageUpload}
            />
          </div>

          {/* 👇 নাম পরিবর্তন */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">Full Name</label>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:border-[#00a6c0] focus:outline-none"
              required
            />
          </div>

          {/* 👇 জাতীয়তা পরিবর্তন */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">Nationality</label>
            <input
              type="text"
              value={editNationality}
              onChange={(e) => setEditNationality(e.target.value)}
              placeholder="e.g. Bangladesh"
              className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:border-[#00a6c0] focus:outline-none"
            />
          </div>

          <DialogFooter className="mt-6 flex gap-3 sm:justify-end">
            <DialogClose className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium hover:bg-gray-50">
              <X size={16} className="mr-2" /> Cancel
            </DialogClose>
            <button
              type="submit"
              disabled={isSaving || isUploading}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#00a6c0] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#00879c] disabled:opacity-70"
            >
              <Save size={16} /> {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
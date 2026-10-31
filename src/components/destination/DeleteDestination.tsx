"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2, AlertTriangle} from "lucide-react";
import { GetTokenClient } from "@/lib/GetTokenClient";

type DeleteDestinationProps = {
  destinationId: string;
  destinationName: string;
};

const DeleteDestination = ({ destinationId, destinationName }: DeleteDestinationProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    const token = await GetTokenClient()

    try {
      const res = await fetch(`https://travel-server-swart.vercel.app/all-destination/${destinationId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete destination");
      }

      const result = await res.json();
      console.log("Deleted:", result);

      setIsOpen(false);
      router.push("/all-destinations");

    } catch (error) {
      console.error("Error deleting destination:", error);
      alert("Failed to delete. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
      >
        <Trash2 size={16} />
        Delete
      </button>

      <DialogContent className="sm:max-w-120 p-0 overflow-hidden border-0 shadow-lg">
        <div className="px-6 pt-6 pb-4 relative">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-50">
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <DialogTitle className="text-xl font-normal text-gray-900">
                Delete Travel Package
              </DialogTitle>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6">
          <DialogDescription className="text-sm text-gray-500 leading-relaxed">
            Are you sure you want to delete <span className="font-semibold text-gray-900">&quot;{destinationName}&quot;</span>? This action cannot be undone and will permanently remove this travel package from the system.
          </DialogDescription>
        </div>

        <div className="flex justify-end gap-3 px-6 pb-6 pt-2">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[#ef4444] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-600 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none"
          >
            <Trash2 size={16} />
            {isDeleting ? "Deleting..." : "Delete Package"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDestination;
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, AlertTriangle, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

export default function CancelBookingButton({ bookingId }: { bookingId: string }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCancel = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`https://travel-server-swart.vercel.app/all-booking/${bookingId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to cancel booking");

      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to cancel booking. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded text-sm font-medium border border-red-200 text-red-500 hover:bg-red-50 transition">
        <Trash2 size={16} /> Cancel
      </DialogTrigger>

      <DialogContent className="sm:max-w-105 p-0 overflow-hidden border-none shadow-none bg-white [&>button]:hidden">

        <div className="px-6 pt-6 pb-4 relative">
          <DialogClose className="absolute right-4 top-4 text-gray-400 hover:text-gray-700 transition-colors">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </DialogClose>

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-50">
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <DialogTitle className="text-xl font-normal text-gray-900">
                Cancel Booking
              </DialogTitle>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6">
          <p className="text-sm text-gray-500 leading-relaxed">
            Are you sure you want to cancel this booking? This action cannot be undone and your reservation will be permanently removed.
          </p>
        </div>

        <div className="flex justify-end gap-3 px-6 pb-6 pt-2">
          <DialogClose className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none">
            Keep Booking
          </DialogClose>

          <button
            onClick={handleCancel}
            disabled={isDeleting}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[#ef4444] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-600 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none"
          >
            <Trash2 size={16} />
            {isDeleting ? "Cancelling..." : "Yes, Cancel"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
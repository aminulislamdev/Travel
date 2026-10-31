"use client";

import { useState } from "react";
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
import { Pencil, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { GetTokenClient } from "@/lib/GetTokenClient";

// Update this data type to match your project as needed.
type DestinationType = {
  _id?: string;
  destinationName: string;
  country: string;
  category?: string;
  price: number | string;
  duration: string;
  departureDate?: string;
  imageUrl: string;
  description?: string;
};

const EditDestination = ({ initialData }: { initialData: DestinationType }) => {
 
  const route = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const [formState, setFormState] = useState({
    source: initialData,
    data: initialData,
  });
  const formData = formState.source === initialData ? formState.data : initialData;


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState({
      source: initialData,
      data: { ...formData, [name]: value },
    });
  };

  const handleSave = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { _id , ...updatedData} = formData;

    const token = await GetTokenClient()
    try {
      const res = await fetch(`https://travel-server-swart.vercel.app/all-destination/${initialData._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) {
        throw new Error("Failed to update destination");
      }
      setIsOpen(false);

      route.refresh();
      // Close the dialog after saving.
    } catch (error) {
      console.error("Error updating destination:", error);
    }
    
  };


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-[#00a6c0] hover:bg-gray-50">
        <Pencil size={16} />
        Edit
      </DialogTrigger>

      <DialogContent className="sm:max-w-125 p-6">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-semibold">Update Travel Package</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Make changes to the travel package details below
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSave} className="space-y-4">
          {/* Destination Name */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">
              Destination Name
            </label>
            <input
              type="text"
              name="destinationName"
              value={formData.destinationName || ""}
              onChange={handleChange}
              placeholder="Bali Paradise"
              className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:border-[#00a6c0] focus:outline-none focus:ring-1 focus:ring-[#00a6c0]"
              required
            />
          </div>

          {/* Country & Category Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1.5">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country || ""}
                onChange={handleChange}
                placeholder="Indonesia"
                className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:border-[#00a6c0] focus:outline-none focus:ring-1 focus:ring-[#00a6c0]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1.5">
                Category
              </label>
              <select
                name="category"
                value={formData.category || ""}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:border-[#00a6c0] focus:outline-none focus:ring-1 focus:ring-[#00a6c0] appearance-none"
              >
                <option value="" disabled>Select Category</option>
                <option value="Beach">Beach</option>
                <option value="Adventure">Adventure</option>
                <option value="Wildlife">Wildlife</option>
                <option value="Mountain">Mountain</option>
              </select>
            </div>
          </div>

          {/* Price & Duration Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1.5">
                Price (USD)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price || ""}
                onChange={handleChange}
                placeholder="e.g., 1299"
                className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:border-[#00a6c0] focus:outline-none focus:ring-1 focus:ring-[#00a6c0]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1.5">
                Duration
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration || ""}
                onChange={handleChange}
                placeholder="e.g., 7 Days/6 Nights"
                className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:border-[#00a6c0] focus:outline-none focus:ring-1 focus:ring-[#00a6c0]"
                required
              />
            </div>
          </div>

          {/* Departure Date */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">
              Departure Date
            </label>
            <input
              type="text"
              name="departureDate"
              value={formData.departureDate || ""}
              onChange={handleChange}
              placeholder="mm/dd/yyyy"
              className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:border-[#00a6c0] focus:outline-none focus:ring-1 focus:ring-[#00a6c0]"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">
              Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl || ""}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:border-[#00a6c0] focus:outline-none focus:ring-1 focus:ring-[#00a6c0]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              rows={4}
              placeholder="Describe the travel experience..."
              className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:border-[#00a6c0] focus:outline-none focus:ring-1 focus:ring-[#00a6c0] resize-none"
            />
          </div>

          {/* Footer Actions */}
          <DialogFooter className="mt-6 flex gap-3 sm:justify-end">
            <DialogClose className="inline-flex items-center gap-2 rounded-md border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50">
              <X size={16} />
              Cancel
            </DialogClose>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md bg-[#00a6c0] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#00879c]"
            >
              <Save size={16} />
              Save Changes
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDestination;
"use client";

import { authClient } from "@/lib/auth-client";
import { GetTokenClient } from "@/lib/GetTokenClient";
import { useState, type FormEvent } from "react";

const categories = ["Beach", "Mountain", "City", "Adventure", "Cultural", "Wildlife", "Cruise"];

const fieldClass =
  "h-9 w-full rounded-none border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand focus:bg-white focus:outline-none";

const labelClass = "text-sm font-medium text-gray-800";

export default function AddDestinationPage() {
  const [submitted, setSubmitted] = useState(false);


  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = new FormData(form);
    const addData = Object.fromEntries(formData.entries());

    const token = await GetTokenClient()

    try {
      const res = await fetch("https://travel-server-swart.vercel.app/add-destination", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify(addData),
      });

      if (!res.ok) {
        throw new Error("Failed to add travel package");
      }

      const result = await res.json();
      console.log("Submitted Data:", addData);
      console.log("Server Response:", result);
      
      form.reset();
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitted(false);
    }
  }


  function handleCancel(e: React.MouseEvent<HTMLButtonElement>) {
    e.currentTarget.form?.reset();
    setSubmitted(false);
  }

  return (
    <main id="main-content" className="flex-1 bg-white px-6 pt-24 pb-16 md:px-12">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-heading text-4xl font-medium tracking-tight text-gray-900 md:text-5xl">
          Add New Travel Package
        </h1>

        <div className="mx-auto mt-12 w-full max-w-lg">
          {submitted && (
            <p className="mb-4 border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              Travel package added successfully.
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            className="rounded-none border border-gray-200 bg-white shadow-sm"
          >
            <div className="space-y-4 p-6">
              {/* Destination Name */}
              <div className="space-y-1.5">
                <label htmlFor="destinationName" className={labelClass}>
                  Destination Name
                </label>
                <input
                  id="destinationName"
                  name="destinationName"
                  placeholder="Bali Paradise"
                  autoComplete="off"
                  required
                  className={fieldClass}
                />
              </div>

              {/* Country + Category */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="country" className={labelClass}>
                    Country
                  </label>
                  <input
                    id="country"
                    name="country"
                    placeholder="Indonesia"
                    autoComplete="off"
                    required
                    className={fieldClass}
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="category" className={labelClass}>
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    defaultValue=""
                    className={fieldClass}
                  >
                    <option value="" disabled>
                      Select category
                    </option>
                    {categories.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price + Duration */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="price" className={labelClass}>
                    Price (USD)
                  </label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="e.g, 1299"
                    required
                    className={fieldClass}
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="duration" className={labelClass}>
                    Duration
                  </label>
                  <input
                    id="duration"
                    name="duration"
                    placeholder="e.g, 7 Days/6 Nights"
                    autoComplete="off"
                    required
                    className={fieldClass}
                  />
                </div>
              </div>

              {/* Departure Date */}
              <div className="space-y-1.5">
                <label htmlFor="departureDate" className={labelClass}>
                  Departure Date
                </label>
                <input
                  id="departureDate"
                  name="departureDate"
                  type="date"
                  required
                  className={fieldClass}
                />
              </div>

              {/* Image URL */}
              <div className="space-y-1.5">
                <label htmlFor="imageUrl" className={labelClass}>
                  Image URL
                </label>
                <input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  autoComplete="off"
                  className={fieldClass}
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label htmlFor="description" className={labelClass}>
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  placeholder="Describe the travel experience..."
                  className="min-h-28 w-full resize-y rounded-none border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 border-t border-gray-100 bg-white p-4 sm:p-6">
              <button
                type="button"
                onClick={handleCancel}
                className="flex h-9 items-center gap-2 rounded-none border border-red-300 px-4 text-sm text-red-500 hover:bg-red-50 hover:text-red-600"
              >
                ✕ Cancel
              </button>
              <button
                type="submit"
                className="flex h-9 items-center gap-2 rounded-none bg-brand px-4 text-sm text-white hover:bg-brand-dark"
              >
                + Add Travel Package
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
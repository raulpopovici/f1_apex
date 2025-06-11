"use client";

import { AddFavourites } from "@/components/AddFavourites";

export default function FavouritesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="w-full py-4 text-center border-b border-gray-700 sticky top-0 bg-black z-50">
        <h1 className="text-2xl font-bold">Follow Teams</h1>
      </div>

      <div className="px-4 py-6 mb-24">
        <AddFavourites />
      </div>
    </div>
  );
}

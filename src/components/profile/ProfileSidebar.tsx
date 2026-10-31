import Image from "next/image";
import { MapPin, Camera } from "lucide-react";
import EditProfileDialog from "./EditProfileDialog";

type ExtendedUser = {
  name: string;
  email: string;
  image?: string | null;
  createdAt: Date;
  nationality?: string;
};

export default function ProfileSidebar({ user }: { user: ExtendedUser }) {
  const getInitials = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  return (
    <div className="lg:col-span-4 bg-white rounded-lg border border-gray-100 shadow-sm p-8 flex flex-col items-center text-center">

      {/* Avatar */}
      <div className="relative mb-5">
        {user.image ? (
          <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md">
            <Image
              src={user.image}
              alt={user.name || "User"}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-28 h-28 rounded-full bg-[#00a6c0] text-white flex items-center justify-center text-4xl font-bold border-4 border-white shadow-md">
            {getInitials(user.name)}
          </div>
        )}
      </div>

      {/* User Info */}
      <h2 className="text-xl font-bold text-gray-900 mb-1">{user.name}</h2>
      <p className="flex items-center text-gray-500 text-sm mb-6">
        <MapPin size={14} className="mr-1" />
        {user.email}
      </p>

      <div className="w-full border-t border-gray-100 my-2"></div>

      <div className="w-full flex justify-between text-sm py-2">
        <span className="text-gray-500">Member since</span>
        <span className="font-medium text-gray-900">
          {new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
        </span>
      </div>

      <div className="w-full flex justify-between text-sm py-2">
        <span className="text-gray-500">Nationality</span>
        <span className="font-medium text-gray-900">
          {user.nationality || "Not set"}
        </span>
      </div>

      {/* Edit Profile Dialog Component */}
      <EditProfileDialog />

    </div>
  );
}
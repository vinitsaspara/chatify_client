import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-gray-200 bg-white flex flex-col">
      
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-200">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 animate-pulse">
          <Users className="h-5 w-5 text-gray-400" />
        </div>
        <div className="hidden lg:block h-4 w-24 rounded bg-gray-200 animate-pulse" />
      </div>

      {/* Contacts Skeleton */}
      <div className="flex-1 overflow-y-auto">
        {skeletonContacts.map((_, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 px-4 py-3"
          >
            {/* Avatar */}
            <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />

            {/* Name + last message */}
            <div className="hidden lg:flex flex-col gap-2 flex-1">
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 w-20 bg-gray-100 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;

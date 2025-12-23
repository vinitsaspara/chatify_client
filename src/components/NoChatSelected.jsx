import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="flex flex-1 items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center text-center max-w-sm px-6">
        
        {/* Icon */}
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
          <MessageSquare className="h-10 w-10 text-blue-600" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800">
          No conversation selected
        </h2>

        {/* Description */}
        <p className="mt-2 text-sm text-gray-500">
          Choose a user from the sidebar to start chatting and share messages in real time.
        </p>

        {/* Optional hint */}
        <span className="mt-6 text-xs text-gray-400">
          💬 Your messages will appear here
        </span>
      </div>
    </div>
  );
};

export default NoChatSelected;

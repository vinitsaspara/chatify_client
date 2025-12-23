import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../store/slices/chatSlice.js";

const ChatHeader = () => {
  const { selectedUser } = useSelector((state) => state.chat);
  const { onlineUsers = [] } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const isOnline = onlineUsers.includes(selectedUser?._id);

  return (
    <div className="px-4 py-3 border-b bg-white flex items-center justify-between">
      
      {/* Left: User info */}
      <div className="flex items-center gap-3">
        
        {/* Avatar */}
        <div className="relative w-10 h-10">
          <img
            src={selectedUser?.avatar?.url || "/avatar-holder.avif"}
            alt="avatar"
            className="w-full h-full rounded-full object-cover"
          />

          {isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
          )}
        </div>

        {/* Name & status */}
        <div className="flex flex-col">
          <h3 className="font-medium text-gray-900 leading-tight">
            {selectedUser?.fullname || "Unknown User"}
          </h3>
          <p
            className={`text-xs ${
              isOnline ? "text-green-600" : "text-gray-400"
            }`}
          >
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* Right: Close button */}
      <button
        onClick={() => dispatch(setSelectedUser(null))}
        className="p-2 rounded-full hover:bg-gray-100 transition"
        aria-label="Close chat"
      >
        <X className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
};

export default ChatHeader;

const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {skeletonMessages.map((_, index) => (
        <div
          key={index}
          className={`flex items-start gap-3 ${
            index % 2 === 0
              ? "justify-start"
              : "justify-end flex-row-reverse"
          }`}
        >
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse" />

          {/* Message Bubble */}
          <div className="flex flex-col gap-2">
            <div className="h-3 w-20 bg-gray-300 rounded animate-pulse" />
            <div className="w-[200px] h-14 bg-gray-300 rounded-lg animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;

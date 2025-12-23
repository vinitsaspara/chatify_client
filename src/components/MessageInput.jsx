import { Image, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSocket } from "../lib/socket";
import { sendMessage } from "../store/slices/chatSlice.js";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [mediaPreview, setMediaPreview] = useState(null);

  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState("");
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const { selectedUser } = useSelector((state) => state.chat);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setMedia(file);
    const type = file.type;

    if (type.startsWith("image/")) {
      setMediaType("image");
      const reader = new FileReader();
      reader.onload = () => setMediaPreview(reader.result);
      reader.readAsDataURL(file);
    } else if (type.startsWith("video/")) {
      setMediaType("video");
      const videoUrl = URL.createObjectURL(file);
      setMediaPreview(videoUrl);
    } else {
      setMedia(null);
      setMediaPreview(null);
      setMediaType("");
      return;
    }
  };

  const removeMedia = () => {
    setMedia(null);
    setMediaPreview(null);
    setMediaType("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text.trim() && !media) return;

    const formData = new FormData();

    if (text) formData.append("text", text);
    if (media) formData.append("media", media); // File object

    // console.log(formData)

    dispatch(sendMessage(formData));

    setText("");
    removeMedia();
  };

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      if (
        newMessage.senderId === selectedUser?._id ||
        newMessage.receiverId === selectedUser?._id
      ) {
        dispatch({
          type: "chat/pushNewMessage",
          payload: newMessage,
        });
      }
    };

    socket.on("newMessage", handleNewMessage);
    return () => socket.off("newMessage", handleNewMessage);
  }, [selectedUser?._id, dispatch]);

  return (
    <div className="p-4 w-full border-t bg-white">
      {/* Media Preview */}
      {mediaPreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            {mediaType === "image" ? (
              <img
                src={mediaPreview}
                alt="preview"
                className="w-24 h-24 object-cover rounded-lg border"
              />
            ) : (
              <video
                src={mediaPreview}
                className="w-32 h-24 object-cover rounded-lg border"
                controls
              />
            )}

            <button
              onClick={removeMedia}
              type="button"
              className="absolute -top-2 -right-2 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-3">
        {/* Media Buttons */}
        <label className="cursor-pointer text-gray-500 hover:text-blue-600">
          <Image className="w-5 h-5" />
          <input
            type="file"
            hidden
            accept="image/*,video/*"
            ref={fileInputRef}
            onChange={handleChange}
          />
        </label>

        {/* Text Input */}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Send Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;

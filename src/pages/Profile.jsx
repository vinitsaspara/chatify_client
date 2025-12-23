import { Camera, Loader2, Mail, User } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../store/slices/authSlice";

const Profile = () => {
  const { authUser, isUpdatingProfile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [selectedImage, setSelectedImage] = useState(null);

  const [formData, setFormData] = useState({
    fullname: authUser?.fullname || "",
    email: authUser?.email || "",
    avatar: authUser?.avatar || null,
  });

  const handelImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSelectedImage(reader.result);
      setFormData({ ...formData, avatar: file });
    };
  };

  const handleUpdateProfile = () => {
    const data = new FormData();
    data.append("fullname", formData.fullname);
    data.append("email", formData.email);
    if (formData.avatar instanceof File) {
      data.append("avatar", formData.avatar);
    }
    dispatch(updateProfile(data));
  };

  return (
    <>
      {/* Page Wrapper – accounts for navbar height */}
      <div className="pt-20 px-4 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 min-h-[calc(100vh-64px)]">
        <div className="max-w-xl mx-auto">
          <div className="backdrop-blur-xl bg-white/80 rounded-2xl shadow-xl p-8 border border-white/40">
            {/* Header */}
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800">
                Profile Settings
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Update your personal information
              </p>
            </div>

            {/* Avatar */}
            <div className="flex justify-center mb-10">
              <div className="relative z-10">
                <div className="w-36 h-36 rounded-full overflow-hidden ring-4 ring-primary/40 shadow-md">
                  <img
                    src={
                      selectedImage ||
                      authUser?.avatar?.url ||
                      "/avatar-placeholder.avif"
                    }
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                </div>

                <label className="absolute bottom-1 right-1 bg-primary p-2 rounded-full cursor-pointer shadow-lg hover:scale-105 transition">
                  <Camera className="w-4 h-4 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handelImageUpload}
                  />
                </label>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
                  <User size={16} /> Full Name oved
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full bg-white focus:ring-2 focus:ring-primary"
                  value={formData.fullname}
                  onChange={(e) =>
                    setFormData({ ...formData, fullname: e.target.value })
                  }
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
                  <Mail size={16} /> Email
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full bg-white focus:ring-2 focus:ring-primary"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Button */}
            <button
              onClick={handleUpdateProfile}
              disabled={isUpdatingProfile}
              className="mt-10 w-full rounded-xl py-3 text-white font-semibold 
                       bg-gradient-to-r from-indigo-500 to-purple-600 
                       hover:from-indigo-600 hover:to-purple-700 
                       transition shadow-lg flex items-center justify-center gap-2"
            >
              {isUpdatingProfile ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Updating...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

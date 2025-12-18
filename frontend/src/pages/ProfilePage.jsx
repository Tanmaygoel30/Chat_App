import React, { useState } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../lib/axios";
import { useEffect } from "react";

const ProfilePage = () => {
  const [isHidden, setIsHidden] = useState(true);
  const user = useSelector((state) => state.auth.user);
  const [pic, setPic] = useState(null);

  useEffect(() => {
    if (user?.profilePic) setPic(user?.profilePic);
  }, [user?.profilePic]);

  function openPic() {
    setIsHidden(false);
  }

  function closePic() {
    setIsHidden(true);
  }

  async function changePic(e) {
    try {
      const newPic = e.target.files[0];

      const formData = new FormData();
      formData.append("image", newPic);

      const res = await axiosInstance.put("/auth/update-profilePic", formData);

      setPic(res.data.profilePic);
    } catch (err) {
      console.log("Profile Pic Upload error: ", err.message);
    }
  }

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* avatar upload section */}

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={pic || "/avatar.png"}
                alt="ProfilePic"
                className="size-32 rounded-full object-cover border-3"
                onClick={openPic}
              />
            </div>

            <div
              className={`size-70 absolute border transition-all duration-300 ease-out ${
                isHidden
                  ? "opacity-0 scale-70 pointer-events-none"
                  : "opacity-100 scale-100"
              } overflow-hidden`}
            >
              <div className="flex items-center justify-end gap-4 bg-zinc-400">
                <div>
                  <label htmlFor="upload-avatar">
                    Edit
                    <input
                      type="file"
                      id="upload-avatar"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => changePic(e)}
                    />
                  </label>
                </div>
                <button className="p-2 bg-red-500" onClick={closePic}>
                  X
                </button>
              </div>
              <div className="size-full bg-black">
                <img
                  src={pic || "/avatar.png"}
                  alt="ProfilePic"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                {/* <User className="w-4 h-4" /> */}
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {user?.fullName}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                {/* <Mail className="w-4 h-4" /> */}
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {user?.email}
              </p>
            </div>
          </div>

          <div className="mt-6 bg-base-300 p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{user?.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

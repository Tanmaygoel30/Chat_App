import React, { useState } from "react";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const [isHidden, setIsHidden] = useState(true);
  const user = useSelector((state) => state.auth.user);

  function openPic() {
    setIsHidden(false);
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
                src="../public/avatar.png"
                alt="ProfilePic"
                className="size-32 rounded-full object-cover border-3"
                onClick={openPic}
              />
              {/* <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200"
              >
                // <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  // onChange={handleImageUpload}
                  // disabled={isUpdatingProfile}
                />
              </label> */}
            </div>
            {/* <p className="text-sm text-zinc-400">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p> */}

            <div
              className={`size-50 absolute border ${
                isHidden ? "hidden" : ""
              } overflow-hidden`}
            >
              <div className="flex items-center justify-end px-2 bg-zinc-400">
                <button>Edit</button>
              </div>
              <div>
                <img
                  src="../public/avatar.png"
                  alt="ProfilePic"
                  className="object-contain"
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

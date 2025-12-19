import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../features/users/usersSlice";

const ChatHeader = () => {
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.user.selectedUser);

  return (
    <div className="w-full h-14 md:h-16 p-2.5 flex items-center justify-between border-b border-base-300">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser?.profilePic || "/avatar.png"}
                alt={selectedUser?.fullName}
              />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser?.fullName}</h3>
            <p className="text-sm text-base-content/70"></p>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() => dispatch(setSelectedUser(null))}
          className="bg-red-500 p-2"
        >
          {/* <X /> */}x
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;

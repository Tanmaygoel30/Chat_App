import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../lib/axios";
import { setSelectedUser } from "../features/users/usersSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [allUsers, setAllUsers] = useState(null);
  const selectedUser = useSelector((state) => state.user.selectedUser);

  useEffect(() => {
    showUsers();
  }, []);

  async function showUsers() {
    const res = await axiosInstance.get("/message/users");
    setAllUsers(res.data);
  }

  function openChat(user) {
    dispatch(setSelectedUser(user));
  }

  return (
    <aside className="h-full w-60 lg:w-80 border-r border-gray-500 flex flex-col transition-all duration-200">
      <div className="overflow-y-auto w-full h-full py-3">
        {allUsers?.map((user, index) => (
          <button
            key={index}
            className="flex justify-start items-center px-4 py-2 gap-2 w-full"
            onClick={() => openChat(user)}
          >
            <div className="size-10 rounded-full border-2 overflow-hidden shrink-0">
              <img
                src={user.profilePic || "/avatar.png"}
                className="object-cover"
                alt="profilePic"
              />
            </div>
            <span className="truncate">{user.fullName}</span>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;

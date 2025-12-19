import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import NoChatSelected from "../components/NoChatSelected";
import { useSelector } from "react-redux";

const HomePage = () => {
  const selectedUser = useSelector((state) => state.user.selectedUser);

  return (
    <div className="h-screen bg-base-200">
      <Navbar />

      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full border border-gray-500 rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

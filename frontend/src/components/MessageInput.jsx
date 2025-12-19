import React from "react";

const MessageInput = () => {
  return (
    <div className="w-full flex-1 p-2">
      <div className="h-full w-full relative flex flex-col">
        <div className="flex-1 overflow-y-auto pb-16 px-2">
          {/* messages go here */}
        </div>
        <form
          action=""
          className="w-full absolute bottom-0 flex items-center gap-2 p-2"
        >
          <input
            type="text"
            className="border px-5 py-2 flex-1 rounded-3xl outline-none"
          />
          <button className="w-20 lg:w-25 border p-2 rounded-3xl bg-green-400">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageInput;

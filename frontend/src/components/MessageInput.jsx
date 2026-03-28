import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../lib/axios";
import { addMessage, getChats } from "../features/users/usersSlice";
import { Album02Icon } from "hugeicons-react";
import { CancelCircleIcon } from "hugeicons-react";

const MessageInput = () => {
  const { register, handleSubmit, setValue, reset } = useForm();
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.user.selectedUser);
  const chats = useSelector((state) => state.user.chats);
  const user = useSelector((state) => state.auth.user);
  const [preview, setPreview] = useState(null);
  const socket = useSelector((state) => state.auth.socket);
  const msgEndRef = useRef(null);

  useEffect(() => {
    getMsgs();
    scrollToBottom();
  }, [selectedUser]);

  useEffect(() => {
    if (!socket) return;

    socket.on("new message", (message) => {
      dispatch(addMessage(message));
    });

    return () => {
      socket.off("new message");
    };
  }, [socket]);

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  async function getMsgs() {
    const id = selectedUser?._id;
    const res = await axiosInstance.get(`/message/${id}`);
    dispatch(getChats(res.data));
  }

  async function sendMsg(data) {
    const id = selectedUser._id;

    const formData = new FormData();

    if (data.text) {
      formData.append("text", data.text);
    }

    if (data.image) {
      // console.log("Image Inf0: ", data.image[0]);
      formData.append("image", data.image[0]);
    }

    const res = await axiosInstance.post(`/message/send/${id}`, formData);
    dispatch(addMessage(res.data));

    setPreview(null);
    reset();
  }

  const scrollToBottom = () => {
    msgEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full min-h-0 flex-1">
      <div className="h-full min-h-0 w-full relative flex flex-col">
        <div className="flex-1 min-h-0 overflow-y-auto pb-16 px-2">
          {/* messages go here */}
          {chats.map((chat, index) => (
            <div
              key={index}
              className={`w-full flex ${
                chat.senderId === user._id ? "justify-end" : "justify-start"
              } p-1 my-2`}
            >
              <div className="bg-green-900 p-2 rounded-lg max-w-[75%]">
                {chat.image && (
                  <img
                    className="max-w-[220px] max-h-[220px] rounded-lg object-contain"
                    src={chat.image}
                    alt="image"
                  />
                )}
                {chat.text && <p>{chat.text}</p>}
              </div>
            </div>
          ))}
          <div ref={msgEndRef}></div>
        </div>
        <form
          className="w-full absolute bottom-0 flex items-center gap-2 p-2 bg-base-100"
          onSubmit={handleSubmit(sendMsg)}
        >
          <input
            type="text"
            {...register("text")}
            placeholder="Message"
            className="border px-5 py-2 flex-1 rounded-3xl outline-none"
          />
          <label htmlFor="photos">
            <Album02Icon size={30} />
          </label>
          <input
            id="photos"
            type="file"
            {...register("image", {
              onChange: (e) => {
                const file = e.target.files[0];
                if (file) {
                  setPreview(URL.createObjectURL(file));
                }
              },
            })}
            className="hidden"
            accept="image/*"
          />
          <button
            className="w-20 lg:w-25 border p-2 rounded-3xl bg-green-400"
            type="submit"
          >
            Send
          </button>
        </form>

        {/* Selected-image preview */}
        {preview && (
          <div className="size-50 absolute bottom-16 left-2 bg-base-200 p-2">
            <img
              className="w-full h-full object-contain"
              src={preview}
              alt="preview"
            />
            <button
              onClick={() => {
                setPreview(null);
                setValue("image", null);
              }}
              className="bg-red-600 absolute top-1 right-1 rounded-full"
            >
              <CancelCircleIcon size={30} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageInput;

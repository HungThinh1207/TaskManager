import { useEffect } from "react";
import useConversation from "../../zustand/userConversation.js";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../context/AuthContext.jsx";
import icon from "../../assets/chat-icon.avif";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="md:min-w-[1000px] flex flex-col bg-white">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-white px-4 py-4 mb-2 border-b border-gray-300">
            <span className=" text-gray-900 font-bold">
              {selectedConversation?.name}
            </span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};
export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-end justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-2xl text-blue-600 font-mono flex flex-col items-center gap-2">
        <h1 className="">
          <div className="text-7xl font-black text-blue-700">WELCOME 👋</div>
          <br />{" "}
          <div className="font-extrabold text-3xl text-blue-700">
            {authUser.name}
          </div>
        </h1>
        <p>Chọn một cuộc trò chuyện để bắt đầu nhắn tin...</p>
        <div className="max-w-[550px]">
          <img src={icon} />
        </div>
      </div>
    </div>
  );
};

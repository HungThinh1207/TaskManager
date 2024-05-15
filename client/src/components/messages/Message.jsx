import { useAuthContext } from "../context/AuthContext";
import { extractTime } from "../../utils/extractTime.js";
import useConversation from "../../zustand/userConversation.js";
const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor =
    chatClassName === "chat-end" ? "bg-blue-500 " : "bg-gray-300";
  const justifyContentClass =
    chatClassName === "chat-end" ? "flex-row-reverse" : "justify-start"; // Chỉnh sửa dòng này
  const textColor = chatClassName === "chat-end" ? "text-white" : "text-black";

  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div
      className={`chat ${chatClassName} flex items-center gap-2 mb-0.5	 ${justifyContentClass} ${textColor}`}
    >
      <div className="chat-image avatar">
        <div className="w-9 rounded-full ">
          <img
            alt=""
            src={
              profilePic ||
              "https://yt3.ggpht.com/xukNZ7OMGIyK8fLNxAwR-uy214xfaZph7btgo5-HpBbT0o8tZuJ38LBkSI_UcQWYklg4P-tZvQ=s88-c-k-c0x00ffffff-no-rj"
            }
          />
        </div>
      </div>
      <div
        className={`chat-bubble ${bubbleBgColor} ${shakeClass} rounded-full p-2 min-w-8 `}
      >
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center text-black">
        {formattedTime}
      </div>
    </div>
  );
};
export default Message;

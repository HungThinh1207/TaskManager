import { useSocketContext } from "../components/context/SocketContext";
import useConversation from "../zustand/userConversation.js";

const Conversation = ({ conversation, lastIdx, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-blue-700 rounded p-2 py-2 h-14 cursor-pointer
				${isSelected ? "bg-[#2564ed2d]" : ""}
			`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-10 h-10 rounded-full overflow-hidden flex justify-center items-center mr-3">
            <img
<<<<<<< HEAD
              className="w-10"
=======
              className="w-w-full h-full object-cover"
>>>>>>> fix UI avatar
              src={
                conversation.profilePic ||
                "https://mega.com.vn/media/news/0206_hinh-nen-messi-pc44.jpg"
              }
              alt="user avatar"
            />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-semibold text-black-100">{conversation.name}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};
export default Conversation;

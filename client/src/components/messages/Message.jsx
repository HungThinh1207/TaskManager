import { useAuthContext } from "../context/AuthContext";
import { extractTime } from "../../utils/extractTime.js";
import useConversation from "../../zustand/userConversation.js";

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const fromMe = message.senderId === authUser._id;
	const formattedTime = extractTime(message.createdAt);

	// Cập nhật class để xác định vị trí của avatar
	const chatClassName = fromMe ? "flex-row-reverse" : "flex-row";
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
	const bubbleBgColor = fromMe ? "bg-blue-600" : "bg-gray-200";
	const textColor = fromMe ? "text-white" : "text-gray-800";
	const shakeClass = message.shouldShake ? "animate-shake" : "";

	return (
		<div className={`flex ${chatClassName} items-end p-2`}>
			<div className='chat-image avatar'>
				<img className='w-10 h-10 rounded-full' alt='' src={profilePic || "https://mega.com.vn/media/news/0206_hinh-nen-messi-pc44.jpg"} />
			</div>
			<div className={`rounded-lg px-4 py-2 ${bubbleBgColor} ${textColor} ${shakeClass} shadow`}>
				{message.message}
			</div>
			<span className='text-xs text-gray-500'>{formattedTime}</span>
		</div>
	);
};
export default Message;

import { useAuthContext } from "../context/AuthContext";
import { extractTime } from "../../utils/extractTime.js";
import useConversation from "../../zustand/userConversation.js";

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const fromMe = message.senderId === authUser._id;
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";

	const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full '>
					<img alt='' src={profilePic || "https://yt3.ggpht.com/xukNZ7OMGIyK8fLNxAwR-uy214xfaZph7btgo5-HpBbT0o8tZuJ38LBkSI_UcQWYklg4P-tZvQ=s88-c-k-c0x00ffffff-no-rj"} />
				</div>
			</div>
			<div className={`chat-bubble text-black ${bubbleBgColor} ${shakeClass} pb-2 border-solid border-2 border-black`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
	);
};
export default Message;
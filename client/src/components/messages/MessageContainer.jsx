import { useEffect } from "react";
import useConversation from "../../zustand/userConversation.js";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../context/AuthContext.jsx";

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();

	useEffect(() => {
		// cleanup function (unmounts)
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	return (
		<div className='md:min-w-[450px] flex flex-col'>
			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
					{/* Header */}
					<div className='bg-slate-500 px-4 py-2 mb-2'>
						<span className='label-text'>To:</span>{" "}
						<span className='text-gray-900 font-bold'>{selectedConversation?.name}</span>
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
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-900 font-semibold flex flex-col items-center gap-2'>
				<p>Xin chào 👋 {authUser.name} ❄</p>
				<p>Chọn một cuộc trò chuyện để bắt đầu nhắn tin</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};
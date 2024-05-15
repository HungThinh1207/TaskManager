import { useEffect, useRef } from "react";
import useGetMessages from "../../hooksChat/GetMessage.js";
import MessageSkeleton from "../sekeleton/MessageSkeleton.jsx";
import Message from "./Message.jsx";
import useListenMessages from "../../hooksChat/ListenMessage.js";

const Messages = () => {
	const { messages, loading } = useGetMessages();
	useListenMessages();
	const lastMessageRef = useRef();

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

	return (
		<div className='flex-1 overflow-auto bg-white p-4 space-y-4'>
			{loading ? (
				<MessageSkeleton />
			) : (
				messages.length > 0 ? (
					Object.keys(messages).map((key) => (
						<div key={key} ref={lastMessageRef}>
							<Message message={messages[key]} />
						</div>
					))
				) : (
					<div className='flex items-center justify-center h-full'>
						<p className='text-gray-800'>Gửi tin nhắn để bắt đầu cuộc trò chuyện</p>
					</div>
				)
			)}
		</div>
	);
};

export default Messages;

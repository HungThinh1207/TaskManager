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
		<div className='px-4 flex-1 overflow-auto'>
			{!loading &&
				messages.length > 0 &&
				Object.keys(messages).map((key) => (
					<div key={key} ref={lastMessageRef}>
						<Message message={messages[key]} />
					</div>
				))}

			{!loading && messages.length === 0 && (
				<p className='text-center'>Gửi tin nhắn để bắt đầu cuộc trò chuyện</p>
			)}
		</div>
	);
};

export default Messages;

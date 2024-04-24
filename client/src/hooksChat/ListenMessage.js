import { useEffect } from "react";

import { useSocketContext } from "../components/context/SocketContext";
import useConversation from "../zustand/userConversation.js";

//import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages } = useConversation();

	useEffect(() => {
		socket?.on("newChat", (newChat) => {
			newChat.shouldShake = true;
			// const sound = new Audio(notificationSound);
			// sound.play();
			setMessages([...messages, newChat]);
		});

		return () => socket?.off("newChat");
	}, [socket, setMessages, messages]);
};
export default useListenMessages;
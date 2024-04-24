import { useEffect, useState } from "react";
import useConversation from "../zustand/userConversation.js";
import { toast } from "sonner";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				const res = await fetch(`/api/chat/${selectedConversation._id}`);
				console.log(selectedConversation)
				const data = await res.json();
				if (data.error) throw new Error(data.error);
				setMessages(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id, setMessages]);

	return { messages, loading };
};
export default useGetMessages;
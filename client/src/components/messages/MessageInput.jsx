import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooksChat/SendMessage.js";

const MessageInput = () => {
	const [message, setMessage] = useState("");
	const { loading, sendMessage } = useSendMessage();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message) return;
		await sendMessage(message);
		setMessage("");
	};

	return (
		<form className='p-4' onSubmit={handleSubmit}>
			<div className='relative'>
				<input
					type='text'
					className='w-full p-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
					placeholder='Send a message'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button type='submit' className='absolute inset-y-0 right-0 flex items-center pr-3'>
					{loading ? <div className='spinner'></div> : <BsSend className='text-blue-500' />}
				</button>
			</div>
		</form>
	);
};
export default MessageInput;


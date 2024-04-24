import useGetConversations from "../hooksChat/GetConversations.js"
import { getRandomEmoji } from "../utils/emojis.js";
import Conversation from "./Conversation.jsx";
import SidebarConversation from "./SidebarConversation.jsx"



const Conversations = () => {
	const { loading, conversations } = useGetConversations();
	const hideUser = JSON.parse(localStorage.getItem("userInfo"));

	// Lọc danh sách conversations để ẩn các đối tượng có conversation._id trùng với hideUser._id
	const filteredConversations = conversations.filter(conversation => conversation._id !== hideUser._id);

	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{filteredConversations.map((conversation, idx) => (
				<Conversation
					key={conversation._id}
					conversation={conversation}
					emoji={getRandomEmoji()}
					lastIdx={idx === filteredConversations.length - 1}
				/>
			))}
			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
	);
};

export default Conversations;
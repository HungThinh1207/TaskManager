import Conversations from "../sidebarChat/Conversations";
import Sidebar from "../sidebarChat/SidebarConversation";
import MessageContainer from "../components/messages/MessageContainer";

const ChatPage = () => {
	return (
		// <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
		// 	<Sidebar />
		// 	<MessageContainer />
		// </div>
		<div>
			<div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			<Sidebar />
			<MessageContainer />
		</div>
		</div>

	);
};
export default ChatPage;
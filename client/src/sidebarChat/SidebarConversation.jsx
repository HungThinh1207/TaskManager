import SearchInput from "./SearchInput.jsx";
import Conversations from "../sidebarChat/Conversations.jsx";

const Sidebar = () => {
	return (
		<div className='border-r border-slate-500 p-4 flex flex-col'>
            <SearchInput/>
            <div className='divider px-3'></div>
            <Conversations/>
		</div>
	);
};
export default Sidebar;
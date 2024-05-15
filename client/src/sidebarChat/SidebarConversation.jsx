import SearchInput from "./SearchInput.jsx";
import Conversations from "../sidebarChat/Conversations.jsx";

const Sidebar = () => {
  return (
    <div className="border-r border-gray-300 p-4 flex flex-col bg-white">
      <SearchInput />
      <div className="divider px-3"></div>
      <Conversations />
    </div>
  );
};
export default Sidebar;

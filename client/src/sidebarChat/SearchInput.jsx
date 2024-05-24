import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../zustand/userConversation.js";
import useGetConversations from "../hooksChat/GetConversations.js";
import { toast } from "sonner";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Cụm từ tìm kiếm phải dài ít nhất 3 ký tự");
    }

    const conversation = conversations.find((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else toast.error("Không tìm thấy người dùng");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center flex-row-reverse justify-end"
    >
      <input
        type="text"
        placeholder="Search…"
        className="bg-gray-200 rounded-r-lg pl-1 py-2 pr-20"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="btn btn-circle">
        <IoSearchSharp className="w-6 h-10 outline-none rounded-l-lg bg-gray-200 pl-2" />
      </div>
    </form>
  );
};
export default SearchInput;

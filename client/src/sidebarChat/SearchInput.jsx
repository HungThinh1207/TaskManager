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
    if (search.length < 2) {
      return toast.error("Cụm từ tìm kiếm phải dài ít nhất 2 ký tự");
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
    <form onSubmit={handleSubmit} className="">
      <div className="relative">
        <input
          type="text"
          placeholder="Search…"
          className="bg-gray-200 rounded-lg pl-4 py-2 pr-28"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-circle">
          <IoSearchSharp className="absolute w-6 h-10 inset-y-0 right-0 outline-none mr-2" />
        </button>
      </div>
    </form>
  );
};
export default SearchInput;

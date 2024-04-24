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

		const conversation = conversations.find((c) => c.name.toLowerCase().includes(search.toLowerCase()));

		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else toast.error("Không tìm thấy người dùng");
	};
	return (
		<form onSubmit={handleSubmit} className='flex items-center gap-2'>
			<input
				type='text'
				placeholder='Search…'
				className='input input-bordered rounded-full'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
				<IoSearchSharp className='w-6 h-6 outline-none' />
			</button>
		</form>
	);
};
export default SearchInput;
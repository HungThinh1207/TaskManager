import { useGetAllProjectsQuery } from "../../redux/slices/api/projectApiSlice";
import { useState } from "react";

const SelectProject = ({ onProjectSelect }) => {
  const { data, isLoading } = useGetAllProjectsQuery();
  const [selectedProject, setSelectedProject] = useState('');

  const handleProjectSelect = (e) => {
    // Lấy giá trị id từ sự kiện onChange
    setSelectedProject(e);
    onProjectSelect(e);
  };

  // const handleFindTasks = () => {
  //   if (!selectedProject) {
  //     alert("Vui lòng chọn một dự án trước khi tìm kiếm!");
  //     return;
  //   }
  //   // Gọi onProjectSelect chỉ khi nhấn nút "find"
  //   onProjectSelect(selectedProject);

  // };

  return (
    <div className="flex flex-row items-center space-x-2.5 h-12">
      <span className="text-sm font-black text-gray-700">Chọn dự án:</span>
      <select
        className="w-[500px] h-12 text-base border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        onChange={(e) => handleProjectSelect(e.target.value)} value={selectedProject}
      >
        <option value="">Chọn một dự án...</option>
        {data?.map((project) => (
          <option key={project._id} value={project._id}>
            {project.name}
          </option>
        ))}
      </select>
      {/* <button
        className="w-20 h-12 text-white bg-blue-500 rounded-md hover:bg-red-500"
        onClick={handleFindTasks}
      >
        Find
      </button> */}
    </div>
  );
};

export default SelectProject;

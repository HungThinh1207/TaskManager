import { useGetAllProjectsQuery } from "../../redux/slices/api/projectApiSlice";
import React, { useState } from 'react';

const ProjectList = ({ setProjectId }) => {
  const { data, isLoading } = useGetAllProjectsQuery();
  const [selectedProject, setSelectedProject] = useState('');

  const handleSelectProject = (projectId) => {
    setSelectedProject(projectId);
    setProjectId(projectId); // Gửi ID của project được chọn về biến projectId
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p className='text-gray-700'>Select project: </p>
      <select
        className='relative w-full cursor-default rounded bg-white pl-3 pr-10 text-left px-3 py-2.5 2xl:py-3 border border-gray-300 sm:text-sm'
        onChange={(e) => handleSelectProject(e.target.value)} value={selectedProject}>
        {data.map((project) => (
          <option className='z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm'
            key={project._id} value={project._id}>
            {project.name}
          </option>
        ))}
      </select>
    </div>
  );

};

export default ProjectList;

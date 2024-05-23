import React, { useState } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useParams } from "react-router-dom";
import Loading from "../components/Loader";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import Tabs from "../components/Tabs";
import TaskTitle from "../components/TaskTitle";
import { BoardView, BoardViewTask } from "../components/BoardView";
import { tasks } from "../assets/data";
import Table from "../components/task/Table";
import AddTask from "../components/task/AddTask";
import { useGetAllTasksQuery } from "../redux/slices/api/taskApiSlice";
import { useGetTaskProjectQuery } from "../redux/slices/api/taskApiSlice";
import SelectProject from "../components/task/SelectProject";

const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};

const Tasks = () => {
  const params = useParams();

  const [selectedProject, setSelectedProject] = useState(null);

  const [selected, setSelected] = useState(0);

  const [open, setOpen] = useState(false);

  const status = params?.status || "";

  const { data: allTasksData, isLoading: isAllTasksLoading } = useGetAllTasksQuery({
    strQuery: status,
    isTrashed: "",
    search: "",
  });

  const { data: projectTasksData, isLoading: isProjectTasksLoading } = useGetTaskProjectQuery({ id: selectedProject || null, stage: status });

  // Sử dụng dữ liệu từ query phù hợp dựa trên selectedProject
  const tasksData = selectedProject ? projectTasksData : allTasksData;
  const isLoading = selectedProject ? isProjectTasksLoading : isAllTasksLoading;


  return isLoading ? (
    <div className='py-10'>
      <Loading />
    </div>
  ) : (
    <div className='w-full'>
      <SelectProject onProjectSelect={setSelectedProject} />
      <div className='flex items-center justify-between mb-4'>
        <Title title={status ? `${status} Tasks` : "Tasks"} />

        {!status && (
          <Button
            onClick={() => setOpen(true)}
            label='Create Task'
            icon={<IoMdAdd className='text-lg' />}
            className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5'
          />
        )}
      </div>

      <Tabs tabs={TABS} setSelected={setSelected}>
        {!status && (
          <div className='w-full flex justify-between gap-4 md:gap-x-12 py-4'>
            <TaskTitle label='To Do' className={TASK_TYPE.todo} />
            <TaskTitle
              label='In Progress'
              className={TASK_TYPE["in progress"]}
            />
            <TaskTitle label='completed' className={TASK_TYPE.completed} />
          </div>
        )}

        {selected !== 1 ? (
          <BoardViewTask tasks={tasksData?.tasks} />
        ) : (
          <div className='w-full'>
            <Table tasks={tasksData?.tasks} />
          </div>
        )}
      </Tabs>

      <AddTask open={open} setOpen={setOpen} />
    </div>
  );
};

export default Tasks;

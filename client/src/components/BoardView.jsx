import React from "react";
import TaskCard from "./TaskCard";

const BoardView = ({ tasks }) => {
  return (
    <div className="w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10">
      {tasks.map((task, index) => (
        <TaskCard task={task} key={index} />
      ))}
    </div>
  );
};

const BoardViewTask = ({ tasks, status }) => {
  const todoTasks = tasks.filter((task) => task.stage === "todo");
  const inProgressTasks = tasks.filter((task) => task.stage === "in progress");
  const completedTasks = tasks.filter((task) => task.stage === "completed");

  if (!status) {
    return (
      <div className="w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10">
        {/* To Do */}
        <div className="col-span-1">
          {todoTasks.map((task, index) => (
            <div key={index} className="bg-gray-100 py-2 pr-2 mb-2 rounded">
              <TaskCard task={task} />
            </div>
          ))}
        </div>

        {/* In Progress */}
        <div className="col-span-1">
          {inProgressTasks.map((task, index) => (
            <div key={index} className="bg-gray-100 p-2 mb-2 rounded">
              <TaskCard task={task} />
            </div>
          ))}
        </div>

        {/* Completed */}
        <div className="col-span-1">
          {completedTasks.map((task, index) => (
            <div key={index} className="bg-gray-100 p-2 mb-2 rounded">
              <TaskCard task={task} />
            </div>
          ))}
        </div>
      </div>
    );
  } else if (
    status === "todo" ||
    status === "in progress" ||
    status === "completed"
  ) {
    return (
      <div className="w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10">
        {tasks.map((task, index) => (
          <TaskCard task={task} key={index} />
        ))}
      </div>
    );
  }
};

export { BoardView, BoardViewTask };

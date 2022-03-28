import React from "react";

import { TasksContext } from "./TasksProvider";
import { Group as GroupType } from "./useTasks";
import Task from "./Task";

const AddTaskButton = (props: { group: GroupType }) => {
  const { addTask } = React.useContext(TasksContext);
  const handleAddTask = () => {
    if (addTask) {
      addTask({
        description: "",
        group: props.group.id
      });
    }
  };
  return (
    <button className="" onClick={handleAddTask}>
      <span className="font-bold text-violet-700">Add task</span>
    </button>
  );
};

const TaskList = (props: { group: GroupType }) => {
  return (
    <div className="">
      <div className="space-y-3">
        {props.group.tasks?.map((task) => {
          return <Task key={task.id} task={task} />;
        })}
      </div>
      <div className="my-6">
        <AddTaskButton group={props.group} />
      </div>
    </div>
  );
};

export default TaskList;

import React from "react";
import cn from "classnames";
import { CheckIcon, TrashIcon, PencilIcon } from "@heroicons/react/solid";

import { Task as TaskType } from "./useTasks";
import { TasksContext } from "./TasksProvider";

const Checkmark = (props: { checked?: boolean }) => {
  return (
    <div
      className={cn({
        "rounded-full inline-block flex items-center justify-center w-5 h-5": true,
        "bg-violet-900": props.checked,
        "bg-gray-200 border border-gray-400": !props.checked
      })}
    >
      {props.checked && <CheckIcon className="h-4 w-4 text-white" />}
    </div>
  );
};

const TaskCheckmark = (props: { task: TaskType }) => {
  const { updateTask } = React.useContext(TasksContext);
  const handleToggleDone = () => {
    if (updateTask) {
      updateTask(props.task.id, {
        done: !props.task.done
      });
    }
  };
  return (
    <button onClick={handleToggleDone}>
      <Checkmark checked={props.task.done} />
    </button>
  );
};

const TaskDescriptionInput = (props: {
  task: TaskType;
  onSubmit: () => unknown;
}) => {
  const { updateTask } = React.useContext(TasksContext);
  const handleDescriptionChange = (e: any) => {
    const description = e.target.value;
    if (updateTask) {
      updateTask(props.task.id, { description });
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      props.onSubmit();
    }
  };

  return (
    <>
      <textarea
        onKeyDown={handleKeyDown}
        name="w"
        autoFocus
        className="bg-transparent w-full"
        placeholder="Enter a description for this task"
        onChange={handleDescriptionChange}
        value={props.task.description}
        rows={1}
      />
      <div className="ml-auto">
        <button
          disabled={!props.task.description}
          className={cn({
            "opacity-30": !props.task.description
          })}
          onClick={props.onSubmit}
        >
          <span className="font-bold text-violet-700">Save</span>
        </button>
      </div>
    </>
  );
};

const TaskDeleteButton = (props: { task: TaskType }) => {
  const { deleteTask } = React.useContext(TasksContext);
  const handleDelete = () => {
    if (deleteTask) {
      deleteTask(props.task.id);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className={cn({
        "group-hover:opacity-100 opacity-0": true
      })}
    >
      <TrashIcon className="h-4 w-4 text-gray-400" />
    </button>
  );
};

const TaskDescription = (props: { task: TaskType }) => {
  return (
    <div className="flex flex-1 items-center space-x-3">
      <div
        className={cn({
          "text-gray-700 ": true,
          "line-through": props.task.done
        })}
      >
        {props.task.description}
      </div>
      {props.task.assignedTo === "mangomint" && (
        <div className="w-6">
          <img src="download.png" alt="mangomint" />
        </div>
      )}
    </div>
  );
};

const Task = (props: { task: TaskType }) => {
  const [isEdit, setIsEdit] = React.useState(!props.task.description);
  const handleToggleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleDescriptionSubmit = () => {
    setIsEdit(false);
  };

  return (
    <div className="group flex w-full  items-center space-x-2 hover:bg-gray-50 p-2 rounded-lg">
      <TaskCheckmark task={props.task} />

      <div className="flex-1 flex w-full space-x-3 mr-auto">
        {isEdit ? (
          <>
            <TaskDescriptionInput
              onSubmit={handleDescriptionSubmit}
              task={props.task}
            />
          </>
        ) : (
          <>
            <TaskDescription task={props.task} />
            <div className="space-x-3 ml-auto">
              <TaskDeleteButton task={props.task} />

              <button
                onClick={handleToggleEdit}
                className={cn({
                  "group-hover:opacity-100 opacity-0": true
                })}
              >
                <PencilIcon className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Task;

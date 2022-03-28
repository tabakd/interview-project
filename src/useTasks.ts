import { useReactive } from "ahooks";

import { v4 as uuid } from "uuid";

export interface Task {
  id: string;
  description: string;
  group: string;
  done?: boolean;
  assignedTo?: "mangomint" | any;
}

export interface Group {
  id: string;
  description: string;
  tasks?: Task[];
  totalTasks?: number;
  totalTasksDone?: number;
  done?: boolean;
}

const useTasks = () => {
  const groups: Group[] = [
    {
      id: "1",
      description: "Complete your business details"
    },
    {
      id: "2",
      description: "Add your staff members and services"
    },
    {
      id: "3",
      description: "Import your data"
    }
  ];

  const tasks: Task[] = useReactive([
    {
      id: "1",
      description: "Do something",
      group: "1",
      done: true,
      assignedTo: "mangomint"
    },
    {
      id: "2",
      description: "Do something else",
      group: "2",
      done: true
    },
    {
      id: "3",
      description: "Do more",
      group: "2",
      done: false
    },
    {
      id: "4",
      description: "Data import task",
      group: "3",
      done: false
    }
  ]);

  function updateTask(id: string, update: Partial<Task>) {
    const task = tasks.find((task) => task.id === id);
    Object.assign(task, update);
    return task;
  }

  function deleteTask(id: string) {
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex > -1) {
      tasks.splice(taskIndex, 1);
    }
  }

  function addTask(add: Omit<Task, "id">) {
    const task = Object.assign(add);
    task.id = uuid();
    tasks.push(task);
  }

  const groupsWithTasks = groups.map((group: Group) => {
    group.tasks = tasks.filter((task) => task.group === group.id);
    group.totalTasks = group.tasks?.length;
    group.totalTasksDone = group.tasks?.filter((task) => task.done).length;
    group.done =
      !!group.totalTasks && group.totalTasks === group.totalTasksDone;

    return group;
  });

  return {
    updateTask,
    deleteTask,
    addTask,
    groups: groupsWithTasks
  };
};

export default useTasks;

import React from "react";

import useTasks from "./useTasks";

export const TasksContext = React.createContext<
  Partial<ReturnType<typeof useTasks>>
>({});

const TasksProvider = (props: { children: any }) => {
  const tasks = useTasks();
  return (
    <TasksContext.Provider value={tasks}>
      {props.children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;

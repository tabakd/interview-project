import Group from "./Group";
import { TasksContext } from "./TasksProvider";
import React from "react";

const GroupList = () => {
  const { groups } = React.useContext(TasksContext);

  return (
    <div className="space-y-6">
      {groups?.map((group) => (
        <Group key={group.id} group={group} />
      ))}
    </div>
  );
};

export default GroupList;

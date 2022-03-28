import cn from "classnames";

import CollapsibleCard from "./CollapsibleCard";
import TaskList from "./TaskList";
import { Group as GroupType } from "./useTasks";

const GroupStatus = (props: { group: GroupType }) => {
  const inProgress = !!(props.group.totalTasksDone && !props.group.done);
  const notStarted = !props.group.totalTasksDone;
  const completed = props.group.done;
  const className = cn({
    "rounded-full font-medium text-sm inline-block px-4 py-2": true,
    "bg-green-500 text-white": inProgress,
    "bg-gray-100 text-gray-600": completed,
    "bg-gray-500 text-white": notStarted
  });

  return (
    <div className={className}>
      {notStarted && <span>NOT STARTED</span>}
      {completed && <span>COMPLETED</span>}
      {inProgress && <span>IN PROGRESS</span>}
    </div>
  );
};

const GroupTitle = (props: { group: GroupType }) => {
  const className = cn({
    "font-medium ": true,
    "line-through text-gray-600": props.group.done
  });
  return <div className={className}>{props.group.description}</div>;
};

const GroupTasksCompletedCount = (props: { group: GroupType }) => {
  return (
    <div className="text-sm text-gray-600">
      {props.group.totalTasksDone} of {props.group.totalTasks} completed
    </div>
  );
};

const GroupHeader = (props: { group: GroupType }) => {
  return (
    <div className="">
      <div className="md:flex space-y-3 items-center justify-between">
        <div className="">
          <GroupTitle group={props.group} />
          <GroupTasksCompletedCount group={props.group} />
        </div>
        <GroupStatus group={props.group} />
      </div>
    </div>
  );
};

const Group = (props: { group: GroupType }) => {
  return (
    <CollapsibleCard header={<GroupHeader group={props.group} />}>
      <TaskList group={props.group} />
    </CollapsibleCard>
  );
};

export default Group;

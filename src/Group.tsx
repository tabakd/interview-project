import cn from "classnames";

import CollapsibleCard from "./CollapsibleCard";
import TaskList from "./TaskList";
import { Group as GroupType } from "./useTasks";

/**
 * GroupStatus component displays the status of a group.
 * It takes a group prop and determines the status based on the group's totalTasksDone and done properties.
 * The status is then displayed with different styles depending on whether the group is in progress, not started, or completed.
 */
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

/**
 * GroupTitle component displays the title of a group.
 * It takes a group prop and displays the group's description.
 * If the group is done, the title is displayed with a line-through style.
 */
const GroupTitle = (props: { group: GroupType }) => {
  const className = cn({
    "font-medium ": true,
    "line-through text-gray-600": props.group.done
  });
  return <div className={className}>{props.group.description}</div>;
};

/**
 * GroupTasksCompletedCount component displays the number of tasks completed in a group.
 * It takes a group prop and displays the group's totalTasksDone and totalTasks properties.
 */
const GroupTasksCompletedCount = (props: { group: GroupType }) => {
  return (
    <div className="text-sm text-gray-600">
      {props.group.totalTasksDone} of {props.group.totalTasks} completed
    </div>
  );
};

/**
 * GroupHeader component displays the header of a group.
 * It takes a group prop and uses the GroupTitle and GroupTasksCompletedCount components to display the group's title and the number of tasks completed.
 * It also uses the GroupStatus component to display the group's status.
 */
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

/**
 * Group component displays a group.
 * It takes a group prop and uses the CollapsibleCard component to display the group's header and tasks.
 */
const Group = (props: { group: GroupType }) => {
  return (
    <CollapsibleCard header={<GroupHeader group={props.group} />}>
      <TaskList group={props.group} />
    </CollapsibleCard>
  );
};

export default Group;

import "./styles.css";
import GroupList from "./GroupList";
import TasksProvider from "./TasksProvider";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="lg:w-1/2 mx-auto p-2 md:p-16">
        <TasksProvider>
          <GroupList />
        </TasksProvider>
      </div>
    </div>
  );
}

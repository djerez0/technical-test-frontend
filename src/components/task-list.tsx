import TaskItem from "./task-item";

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <ul className="grid list-none gap-6">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
};

export default TaskList;

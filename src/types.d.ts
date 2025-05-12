interface Task {
  id: string;
  title: string;
  description: string;
}

interface TaskListProps {
  tasks: Task[]
}

type TaskItemProps = {
  task: Task;
};


interface Task {
  id: number;
  title: string;
  description: string;
}

interface TaskListProps {
  tasks: Task[]
}

type TaskItemProps = {
  task: Task;
};


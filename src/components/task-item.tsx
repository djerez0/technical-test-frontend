import { TrashIcon } from "@heroicons/react/24/outline";
import { useDeleteTask } from "../hooks/use-delete-task.hook";
import { useAuth } from "../hooks/use-auth.hook";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const TaskItem = ({ task }: TaskItemProps) => {
  const { mutateAsync, isPending } = useDeleteTask();
  const { logout } = useAuth();

  const handleDelete = async () => {
    try {
      await mutateAsync(task.id);
      toast.success("Tarea eliminada correctamente");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          logout();
          return;
        }
      }

      toast.error("Error al eliminar la tarea. Inténtelo nuevamente.");
    }
  };
  return (
    <li className="flex items-center justify-between bg-white shadow-md p-4 rounded-lg border border-gray-200">
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <label htmlFor={task.id.toString()} className={`text-base`}>
            {task.title}
          </label>
          {task.description && (
            <span className="text-gray-500 text-sm">{task.description}</span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="text-red-500 hover:text-red-700"
          aria-label={`Delete ${task.title} Task`}
          onClick={handleDelete}
        >
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <TrashIcon className="w-5 h-5" />
          )}
        </button>
      </div>
    </li>
  );
};

export default TaskItem;

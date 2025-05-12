import { useMutation } from "@tanstack/react-query";
import { deleteTaskService } from "../api/delete-task.service";
import { queryClient } from "../api/query-client";

export const useDeleteTask = () => {
  return useMutation({
    mutationKey: ["delete-task"],
    mutationFn: deleteTaskService,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["get-tasks"],
      });
    },
  });
};

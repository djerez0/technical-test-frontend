import { useMutation } from "@tanstack/react-query";
import { addTaskService } from "../api/add-task.service";
import { queryClient } from "../api/query-client";

export const useAddTask = () => {
  return useMutation({
    mutationKey: ["add-task"],
    mutationFn: addTaskService,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["get-tasks"],
      });
    },
  });
};

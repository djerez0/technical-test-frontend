import { useQuery } from "@tanstack/react-query";
import { getTaskService } from "../api/get-tasks.service";

export const useGetTasks = () => {
  return useQuery({
    queryKey: ["get-tasks"],
    queryFn: getTaskService,
  });
};

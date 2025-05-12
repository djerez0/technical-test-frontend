import { useMutation } from "@tanstack/react-query";
import { logoutService } from "../api/logout.service";

export const useLogout = () => {
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: logoutService,
  });
};

import { useMutation } from "@tanstack/react-query";
import { signInService } from "../api/sign-in.service";

export const useSignIn = () => {
  return useMutation({
    mutationKey: ["sign-in"],
    mutationFn: signInService,
  });
};

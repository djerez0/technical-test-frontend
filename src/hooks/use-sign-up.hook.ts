import { useMutation } from "@tanstack/react-query"
import { signUpService } from "../api/sign-up.service"

export const useSignUp = () => {
  return useMutation({
    mutationKey: ["sign-up"],
    mutationFn: signUpService,
  })
}
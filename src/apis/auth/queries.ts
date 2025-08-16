import { useMutation } from "@tanstack/react-query";
import { signup } from "@/apis/auth";
import { SignupFormRequest, User } from "@/apis/auth/types";

export function useSignup() {
  return useMutation<User, Error, SignupFormRequest>({
    mutationFn: signup,
  });
}

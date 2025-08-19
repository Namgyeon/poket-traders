import { useMutation } from "@tanstack/react-query";
import { signin, signinWithGoogle, signup } from "@/apis/auth";
import { SigninFormRequest, SignupFormRequest, User } from "@/apis/auth/types";

export function useSignup() {
  return useMutation<User, Error, SignupFormRequest>({
    mutationFn: signup,
  });
}

export function useSignin() {
  return useMutation<User, Error, SigninFormRequest>({
    mutationFn: signin,
  });
}

export function useSigninWithGoogle() {
  return useMutation<User, Error, void>({
    mutationFn: signinWithGoogle,
  });
}

import { useMutation, useQuery } from "@tanstack/react-query";
import { getUser, signin, signinWithGoogle, signup } from "@/apis/auth";
import { SigninFormRequest, SignupFormRequest, User } from "@/apis/auth/types";
import { auth } from "@/lib/firebase";

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

export function useGetUser() {
  return useQuery<User, Error>({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: !!auth.currentUser,
  });
}

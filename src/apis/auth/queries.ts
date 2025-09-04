import { useMutation, useQuery } from "@tanstack/react-query";
import { getUser, signin, signinWithGoogle, signup } from "@/apis/auth";
import { SigninFormRequest, SignupFormRequest, User } from "@/apis/auth/types";
import { auth } from "@/lib/firebase";
import { setAuthenticated } from "@/store/auth/authSlice";
import { useAppDispatch } from "@/store/hooks";

export function useSignup() {
  return useMutation<User, Error, SignupFormRequest>({
    mutationFn: signup,
  });
}

export function useSignin() {
  const dispatch = useAppDispatch();
  return useMutation<User, Error, SigninFormRequest>({
    mutationFn: signin,
    onSuccess: () => {
      dispatch(setAuthenticated(true));
    },
    onError: () => {
      dispatch(setAuthenticated(false));
    },
  });
}

export function useSigninWithGoogle() {
  const dispatch = useAppDispatch();
  return useMutation<User, Error, void>({
    mutationFn: signinWithGoogle,
    onSuccess: () => {
      dispatch(setAuthenticated(true));
    },
    onError: () => {
      dispatch(setAuthenticated(false));
    },
  });
}

export function useGetUser() {
  return useQuery<User, Error>({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: !!auth.currentUser,
  });
}

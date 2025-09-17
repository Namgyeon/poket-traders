"use client";

import { useForm } from "react-hook-form";
import Input from "@/components/ui/Input/Input";
import PasswordInput from "@/components/ui/Input/PasswordInput";
import Button from "@/components/ui/Button/Button";
import { useSignup } from "@/apis/auth/queries";
import { signupFormSchema } from "@/apis/auth/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getAuthErrorMessage } from "@/lib/utils/errorMessage";

export default function SignupForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      nickname: "",
      friendId: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutateAsync: signup } = useSignup();

  const watchedValues = watch();

  const onSubmit = handleSubmit(async (data) => {
    const signupPromise = signup(data);

    toast.promise(signupPromise, {
      loading: "Signing up...",
      success: `회원가입 완료!\n로그인페이지로 이동합니다.`,
      error: (error) => {
        return getAuthErrorMessage(error.code);
      },
    });

    try {
      await signupPromise;
      router.push("/signin");
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <Input
        id="email"
        label="Email Address"
        labelId="email"
        value={watchedValues.email}
        error={!!errors.email}
        errorMessage={errors.email?.message}
        {...register("email")}
      />
      <Input
        id="nickname"
        label="Nickname"
        labelId="nickname"
        value={watchedValues.nickname}
        error={!!errors.nickname}
        errorMessage={errors.nickname?.message}
        {...register("nickname")}
      />
      <Input
        id="friendId"
        label="Friend ID"
        labelId="friendId"
        value={watchedValues.friendId}
        placeholder="1234-1234-1234-1234"
        error={!!errors.friendId}
        errorMessage={errors.friendId?.message}
        {...register("friendId")}
      />
      <PasswordInput
        id="password"
        label="Password"
        labelId="password"
        value={watchedValues.password}
        error={!!errors.password}
        errorMessage={errors.password?.message}
        {...register("password")}
      />
      <PasswordInput
        id="confirmPassword"
        label="Confirm Password"
        labelId="confirmPassword"
        value={watchedValues.confirmPassword}
        error={!!errors.confirmPassword}
        errorMessage={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />
      <Button
        type="submit"
        variant="primary"
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting ? "입력중..." : "회원가입"}
      </Button>
    </form>
  );
}

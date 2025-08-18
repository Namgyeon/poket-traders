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
        const getErrorMessage = (errorCode: string) => {
          switch (errorCode) {
            case "auth/email-already-in-use":
              return "이미 사용 중인 이메일입니다.";
            case "auth/weak-password":
              return "비밀번호가 너무 간단합니다.";
            case "auth/invalid-email":
              return "올바르지 않은 이메일 형식입니다.";
            case "auth/operation-not-allowed":
              return "이메일 회원가입이 비활성화되어 있습니다.";
            case "auth/network-request-failed":
              return "네트워크 연결을 확인해주세요.";
            default:
              return "회원가입 중 오류가 발생했습니다.";
          }
        };

        const errorMessage = error?.code
          ? getErrorMessage(error.code)
          : error?.message || "알 수 없는 오류가 발생했습니다.";

        return `❌ ${errorMessage}`;
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
      <PasswordInput
        id="password"
        label="Password"
        labelId="password"
        value={watchedValues.password}
        error={errors.password?.message}
        errorMessage={errors.password?.message}
        {...register("password")}
      />
      <PasswordInput
        id="confirmPassword"
        label="Confirm Password"
        labelId="confirmPassword"
        value={watchedValues.confirmPassword}
        error={errors.confirmPassword?.message}
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

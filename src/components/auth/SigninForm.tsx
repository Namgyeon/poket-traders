"use client";

import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/Button/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SigninFormRequest, signinFormSchema } from "@/apis/auth/types";
import { signin } from "@/apis/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SigninForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SigninFormRequest>({
    resolver: zodResolver(signinFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const watchedValues = watch();
  const router = useRouter();

  const onSubmit = async (data: SigninFormRequest) => {
    const signinPromise = signin(data);

    toast.promise(signinPromise, {
      loading: "로그인 중입니다... ⏳",
      success: (userData) => `🎉 환영합니다, ${userData.nickname}님!`,
      error: (error) => {
        const getErrorMessage = (errorCode: string) => {
          switch (errorCode) {
            case "auth/user-not-found":
              return "등록되지 않은 이메일입니다.";
            case "auth/wrong-password":
              return "잘못된 비밀번호입니다.";
            case "auth/invalid-email":
              return "올바르지 않은 이메일 형식입니다.";
            case "auth/invalid-credential":
              return "이메일 또는 비밀번호가 올바르지 않습니다.";
            case "auth/too-many-requests":
              return "너무 많은 시도로 일시적으로 차단되었습니다.";
            default:
              return "로그인 중 오류가 발생했습니다.";
          }
        };

        const errorMessage = error?.code
          ? getErrorMessage(error.code)
          : error?.message || "알 수 없는 오류가 발생했습니다.";

        return `❌ ${errorMessage}`;
      },
    });

    try {
      await signinPromise;
      router.replace("/");
    } catch (error) {
      console.error("Signin failed:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <Input
          type="email"
          id="email"
          label="Email Address"
          labelId="email"
          value={watchedValues.email}
          {...register("email")}
          error={!!errors.email}
          errorMessage={errors.email?.message}
        />
        <Input
          type="password"
          id="password"
          label="Password"
          labelId="password"
          value={watchedValues.password}
          {...register("password")}
          error={!!errors.password}
          errorMessage={errors.password?.message}
        />
        <Button type="submit" disabled={!isValid || isSubmitting}>
          로그인
        </Button>
      </form>
    </div>
  );
}

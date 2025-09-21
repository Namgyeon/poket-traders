"use client";

import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/Button/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SigninFormRequest, signinFormSchema } from "@/apis/auth/types";
import { signin } from "@/apis/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getAuthErrorMessage } from "@/lib/utils/errorMessage";

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
        return getAuthErrorMessage(error.code);
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
          hasValue={!!watchedValues.email}
          error={!!errors.email}
          errorMessage={errors.email?.message}
        />
        <Input
          type="password"
          id="password"
          label="Password"
          labelId="password"
          value={watchedValues.password}
          hasValue={!!watchedValues.password}
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

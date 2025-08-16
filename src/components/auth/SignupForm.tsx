"use client";

import { useForm } from "react-hook-form";
import Input from "@/components/ui/Input/Input";
import BaseLabel from "@/components/ui/label/BaseLabel";
import PasswordInput from "@/components/ui/Input/PasswordInput";
import Button from "@/components/ui/Button/Button";
import { useSignup } from "@/apis/auth/queries";
import { signupFormSchema } from "@/apis/auth/types";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
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

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signup(data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <div>
        <BaseLabel label="이메일" id="email" />
        <Input
          id="email"
          error={errors.email?.message}
          errorMessage={errors.email?.message}
          {...register("email")}
        />
      </div>
      <div>
        <BaseLabel label="닉네임" id="nickname" />
        <Input
          id="nickname"
          error={errors.nickname?.message}
          errorMessage={errors.nickname?.message}
          {...register("nickname")}
        />
      </div>
      <div>
        <BaseLabel label="비밀번호" id="password" />
        <PasswordInput
          id="password"
          error={errors.password?.message}
          errorMessage={errors.password?.message}
          {...register("password")}
        />
      </div>
      <div>
        <BaseLabel label="비밀번호 확인" id="confirmPassword" />
        <PasswordInput
          id="confirmPassword"
          error={errors.confirmPassword?.message}
          errorMessage={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
      </div>
      <div>
        <Button type="submit" variant="primary" disabled={!isValid}>
          회원가입
        </Button>
      </div>
    </form>
  );
}

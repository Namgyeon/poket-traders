"use client";

import { useForm } from "react-hook-form";
import Input from "@/components/ui/Input/Input";
import PasswordInput from "@/components/ui/Input/PasswordInput";
import Button from "@/components/ui/Button/Button";
import { useSignup } from "@/apis/auth/queries";
import { signupFormSchema } from "@/apis/auth/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    watch,
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

  const watchedValues = watch();

  const onSubmit = handleSubmit(async (data) => {
    const signupPromise = signup(data);

    toast.promise(signupPromise, {
      loading: "Signing up...",
      success: "회원가입 완료!",
      error: (error) => {
        return `회원가입 실패 ${error.message}`;
      },
    });

    try {
      await signupPromise;
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <div>
        <Input
          id="email"
          label="Email Address"
          labelId="email"
          value={watchedValues.email}
          error={errors.email?.message}
          errorMessage={errors.email?.message}
          {...register("email")}
        />
      </div>
      <div>
        <Input
          id="nickname"
          label="Nickname"
          labelId="nickname"
          value={watchedValues.nickname}
          error={errors.nickname?.message}
          errorMessage={errors.nickname?.message}
          {...register("nickname")}
        />
      </div>
      <div>
        <PasswordInput
          id="password"
          label="Password"
          labelId="password"
          value={watchedValues.password}
          error={errors.password?.message}
          errorMessage={errors.password?.message}
          {...register("password")}
        />
      </div>
      <div>
        <PasswordInput
          id="confirmPassword"
          label="Confirm Password"
          labelId="confirmPassword"
          value={watchedValues.confirmPassword}
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

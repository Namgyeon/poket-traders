"use client";

import { useForm } from "react-hook-form";
import Input from "@/components/ui/Input/Input";
import BaseLabel from "@/components/ui/label/BaseLabel";
import PasswordInput from "@/components/ui/Input/PasswordInput";
import Button from "@/components/ui/Button/Button";

export default function SignupForm() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      nickname: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <form className="flex flex-col gap-4">
      <div>
        <BaseLabel label="이메일" id="email" />
        <Input id="email" />
      </div>
      <div>
        <BaseLabel label="닉네임" id="nickname" />
        <Input id="nickname" />
      </div>
      <div>
        <BaseLabel label="비밀번호" id="password" />
        <PasswordInput id="password" />
      </div>
      <div>
        <BaseLabel label="비밀번호 확인" id="confirmPassword" />
        <PasswordInput id="confirmPassword" />
      </div>
      <div>
        <Button type="submit" variant="primary">
          회원가입
        </Button>
      </div>
    </form>
  );
}

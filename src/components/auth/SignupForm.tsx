"use client";

import { useForm } from "react-hook-form";
import Input from "../ui/Input/Input";
import BaseLabel from "../ui/label/BaseLabel";
import PasswordInput from "../ui/Input/PasswordInput";

export default function SignupForm() {
  console.log("리렌더링 체크");
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
    </form>
  );
}

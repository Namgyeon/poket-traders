"use client";

import { useForm } from "react-hook-form";
import Input from "../ui/Input/Input";
import BaseLabel from "../ui/label/BaseLabel";

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
        <BaseLabel label="Email" />
        <Input />
      </div>
    </form>
  );
}

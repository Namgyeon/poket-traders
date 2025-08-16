"use client";

import { useForm } from "react-hook-form";
import Input from "../ui/Input/Input";

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
      <Input />
    </form>
  );
}

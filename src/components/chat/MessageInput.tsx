"use client";

import { useForm } from "react-hook-form";
import Input from "../ui/Input/Input";
import Button from "../ui/Button/Button";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

export default function MessageInput() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div>
      <form>
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Input
              {...register("message")}
              error={!!errors.message}
              errorMessage={errors.message?.message as string}
              className="w-full"
            />
            <PaperAirplaneIcon className="w-10 h-10 p-2 absolute right-4 top-1/2 -translate-y-1/2 hover:bg-gray-200 rounded-md transition-all duration-300 cursor-pointer" />
          </div>
        </div>
      </form>
    </div>
  );
}

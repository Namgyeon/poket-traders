import clsx from "clsx";
import { InputHTMLAttributes, useState } from "react";
import Image from "next/image";
import eyeIcon from "@/assets/Icon/eye.svg";
import eyeOffIcon from "@/assets/Icon/eye-off.svg";

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function PasswordInput({
  className,
  ...props
}: PasswordInputProps) {
  const [isShowPassword, setIsShowPassword] = useState(false);
  return (
    <div className="relative">
      <input
        type={isShowPassword ? "text" : "password"}
        className={clsx(
          "w-full p-2 border-2 border-gray-300 rounded-md",
          className
        )}
        {...props}
      />
      <button
        type="button"
        onClick={() => setIsShowPassword(!isShowPassword)}
        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer hover:bg-gray-200 rounded-md transition-all duration-300"
      >
        <Image
          src={isShowPassword ? eyeIcon : eyeOffIcon}
          width={20}
          height={20}
          alt={isShowPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
          sizes="20px"
        />
      </button>
    </div>
  );
}

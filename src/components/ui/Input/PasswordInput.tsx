import clsx from "clsx";
import { forwardRef, InputHTMLAttributes, useState } from "react";
import Image from "next/image";
import eyeIcon from "@/assets/Icon/eye.svg";
import eyeOffIcon from "@/assets/Icon/eye-off.svg";

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: string;
  errorMessage?: string;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, error, errorMessage, ...props }, ref) => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    return (
      <div className="flex flex-col gap-2">
        <div className="relative">
          <input
            ref={ref}
            type={isShowPassword ? "text" : "password"}
            className={clsx(
              "w-full px-4 py-2 text-lg border-2 border-gray-300 rounded-md",
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
        {error && <p className="text-red-500">{errorMessage}</p>}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
export default PasswordInput;

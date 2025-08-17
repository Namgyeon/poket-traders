import clsx from "clsx";
import { forwardRef, InputHTMLAttributes, useState } from "react";
import Image from "next/image";
import eyeIcon from "@/assets/Icon/eye.svg";
import eyeOffIcon from "@/assets/Icon/eye-off.svg";

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: string;
  errorMessage?: string;
  label?: string;
  labelId?: string;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      className,
      error,
      errorMessage,
      label,
      labelId,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const hasValue = props.value && String(props.value).length > 0;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const shouldLabelFloat = isFocused || hasValue;

    return (
      <div className="flex flex-col gap-2">
        <div className="relative">
          <input
            ref={ref}
            onFocus={handleFocus}
            onBlur={handleBlur}
            type={isShowPassword ? "text" : "password"}
            className={clsx(
              "w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-md",
              className
            )}
            {...props}
          />
          <label
            htmlFor={labelId}
            className={clsx(
              "absolute text-gray-500",
              shouldLabelFloat
                ? "-top-5 left-0 text-xs transition-all duration-400"
                : "top-1/2 left-4 -translate-y-1/2 transition-all duration-400"
            )}
          >
            {label}
          </label>
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

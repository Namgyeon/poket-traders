import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "primary" | "secondary" | "destructive";
}

export default function Button({
  className,
  variant = "primary",
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "w-full px-4 py-2 font-medium rounded-md transition-all duration-300",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        // variant별 스타일
        {
          "bg-sky-500 text-white hover:bg-sky-700": variant === "primary",
          "bg-gray-500 text-white hover:bg-gray-700": variant === "secondary",
          "bg-red-500 text-white hover:bg-red-700": variant === "destructive",
        },
        {
          "opacity-50": disabled,
        },
        className
      )}
      {...props}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

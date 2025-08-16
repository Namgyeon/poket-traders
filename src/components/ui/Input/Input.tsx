import { InputHTMLAttributes } from "react";
import clsx from "clsx";

export default function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={clsx(
        "w-full p-2 border-2 border-gray-300 rounded-md",
        className
      )}
      {...props}
    />
  );
}

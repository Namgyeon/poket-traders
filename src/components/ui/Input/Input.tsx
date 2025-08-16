import { forwardRef, InputHTMLAttributes } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  errorMessage?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, errorMessage, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <input
          ref={ref}
          type="text"
          className={clsx(
            "w-full px-4 py-2 text-lg border-2 border-gray-300 rounded-md",
            className
          )}
          {...props}
        />
        {error && <p className="text-red-500">{errorMessage}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;

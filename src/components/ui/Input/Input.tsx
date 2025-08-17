"use client";

import { forwardRef, InputHTMLAttributes, useState } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  errorMessage?: string;
  label?: string;
  labelId?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
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
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = props.value && String(props.value).length > 0;
    const shouldLabelFloat = isFocused || hasValue;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    return (
      <div className="flex flex-col gap-2">
        <div className="relative">
          <input
            ref={ref}
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="text"
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
        </div>
        {error && <p className="text-red-500">{errorMessage}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;

import { HTMLAttributes } from "react";
import clsx from "clsx";

interface BaseLabelProps extends HTMLAttributes<HTMLLabelElement> {
  label: string;
}

export default function BaseLabel({
  label,
  className,
  ...props
}: BaseLabelProps) {
  return (
    <label className={clsx("text-lg font-medium", className)} {...props}>
      {label}
    </label>
  );
}

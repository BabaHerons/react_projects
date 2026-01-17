import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loadingMsg?: string;
  className?: string
}

export const LoadingButton = ({
  loadingMsg = "Loading",
  className,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={clsx("btn text-gray-500 hover:cursor-not-allowed", className)}
      type="button"
      {...rest}
    >
      {loadingMsg}&nbsp;
      <span className="loading loading-dots text-gray-500"></span>
    </button>
  );
};

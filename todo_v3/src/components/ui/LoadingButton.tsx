import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loadingMsg?: string;
  className?: string;
  keepButton?: boolean
}

export const LoadingButton = ({
  loadingMsg = "Loading",
  className,
  keepButton = true,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={clsx(`${keepButton ? 'btn text-gray-500 hover:cursor-not-allowed' : ''}`, className)}
      type="button"
      {...rest}
    >
      {loadingMsg}&nbsp;
      <span className="loading loading-dots text-gray-400"></span>
    </button>
  );
};

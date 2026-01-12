import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "neutral"
  | "success"
  | "error"
  | "warning"
  | "info";

type ButtonAppearance = "solid" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  appearance?: ButtonAppearance;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  iconOnly?: boolean;
  ariaLabel?: string;
  children?: ReactNode;
}


export const Button = ({
  variant = "neutral",
  appearance = "solid",
  size = "md",
  isLoading = false,
  icon,
  iconPosition = "left",
  iconOnly = false,
  ariaLabel,
  children,
  disabled,
  className,
  ...rest
}: ButtonProps) => {
  return (
    <button
      aria-label={iconOnly ? ariaLabel : undefined}
      className={clsx(
        "btn",
        {
          [`btn-${variant}`]: appearance === "solid",
          [`btn-outline btn-${variant}`]: appearance === "outline",
          [`btn-ghost text-${variant}`]: appearance === "ghost",

          "btn-sm": size === "sm",
          "btn-md": size === "md",
          "btn-lg": size === "lg",

          "btn-square": iconOnly,
          "cursor-not-allowed text-gray-500": isLoading,
        },
        className
      )}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <>
            {children && <span className="">Loading</span>}
            <span className="loading loading-dots"></span>
        </>
      ) : iconOnly ? (
        icon
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <span className="mr-2 flex items-center">{icon}</span>
          )}
          {children}
          {icon && iconPosition === "right" && (
            <span className="ml-2 flex items-center">{icon}</span>
          )}
        </>
      )}
    </button>
  );
};


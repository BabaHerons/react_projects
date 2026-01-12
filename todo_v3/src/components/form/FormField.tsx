import type { ReactNode } from "react";

type Props = {
  label?: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
};

export function FormField({ label, required, error, children }: Props) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="label">
          {label}{required && <span className="text-red-500">*</span>}
        </label>
      )}

      {children}

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

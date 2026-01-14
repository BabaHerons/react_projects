import type { ReactNode } from "react";

type Props = {
  label?: string;
  show_asterisk?: boolean;
  error?: string;
  children: ReactNode;
};

export function FormField({ label, show_asterisk, error, children }: Props) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="font-bold text-sm">
          {label}{show_asterisk && <span className="text-red-500">*</span>}
        </label>
      )}

      {children}

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

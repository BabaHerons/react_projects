import { FormField } from "./FormField";
import type { FormFieldProps } from "./types";
import type { FieldValues } from "react-hook-form";

type Props<T extends FieldValues> = FormFieldProps<T> & {
  placeholder?: string;
  rows?: number;
};

export function TextAreaField<T extends FieldValues>({
  name,
  label,
  register,
  errors,
  rules,
  show_asterisk,
  placeholder,
  rows = 4,
  className = "",
}: Props<T>) {
  const errorMessage = errors?.[name]?.message as string | undefined;

  return (
    <FormField label={label} show_asterisk={show_asterisk} error={errorMessage}>
      {/* <textarea
        rows={rows}
        placeholder={placeholder}
        className={`textarea ${errorMessage ? "textarea-error" : ""} ${className}`}
        {...register(name, rules)}
      /> */}
      <textarea
        rows={rows}
        placeholder={placeholder}
        className={`textarea pr-4 py-3 rounded-xl border border-slate-600 focus:ring-2 focus:border-transparent outline-none transition-all ${errorMessage ? "focus:ring-red-500" : ""} ${className}`}
        {...register(name, rules)}
      />
    </FormField>
  );
}

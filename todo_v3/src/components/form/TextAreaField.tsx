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
  required,
  placeholder,
  rows = 4,
  className = "",
}: Props<T>) {
  const errorMessage = errors?.[name]?.message as string | undefined;

  return (
    <FormField label={label} required={required} error={errorMessage}>
      <textarea
        rows={rows}
        placeholder={placeholder}
        className={`textarea ${errorMessage ? "textarea-error" : ""} ${className}`}
        {...register(name, rules)}
      />
    </FormField>
  );
}

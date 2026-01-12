import type { FieldErrors, Path, UseFormRegister, FieldValues } from "react-hook-form";

export type FormFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  rules?: any;
  required?: boolean;
  className?: string;
};

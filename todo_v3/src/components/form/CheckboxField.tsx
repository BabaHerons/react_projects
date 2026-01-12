import type { FieldValues } from "react-hook-form";
import type { FormFieldProps } from "./types";

type Props<T extends FieldValues> = FormFieldProps<T>;

export function CheckboxField<T extends FieldValues>({
  name,
  label,
  register,
  errors,
  rules,
}: Props<T>) {
  const errorMessage = errors?.[name]?.message as string | undefined;

  return (
    <div className="form-control">
      <label className="label cursor-pointer gap-2">
        <input
          type="checkbox"
          className={`checkbox ${errorMessage ? "checkbox-error" : ""}`}
          {...register(name, rules)}
        />
        <span className="label-text">{label}</span>
      </label>

      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
}


// Usage
{/* 
    <CheckboxField<FormData>
        name="is_active"
        label="Is Active?"
        register={register}
        errors={errors}
    /> 
*/}

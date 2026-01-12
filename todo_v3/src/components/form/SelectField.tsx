import { FormField } from "./FormField";
import type { FormFieldProps } from "./types";
import type { FieldValues } from "react-hook-form";

type SelectOption = {
  label: string;
  value: string | number;
};

type Props<T extends FieldValues> = FormFieldProps<T> & {
  options: SelectOption[];
  placeholder?: string;
};

export function SelectField<T extends FieldValues>({
  name,
  label,
  register,
  errors,
  rules,
  show_asterisk,
  options,
  placeholder = "Select an option",
  className = "",
}: Props<T>) {
  const errorMessage = errors?.[name]?.message as string | undefined;

  return (
    <FormField label={label} show_asterisk={show_asterisk} error={errorMessage}>
      <select
        className={`select ${errorMessage ? "select-error" : ""} ${className}`}
        {...register(name, rules)}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FormField>
  );
}



// Example Usage
{/* 
    <SelectField<LoginPayload>
        name="role"
        label="Role"
        required
        register={register}
        errors={errors}
        rules={{ required: "Role is required" }}
        options={[
          { label: "Admin", value: "admin" },
          { label: "Teacher", value: "teacher" },
        ]}
    /> 
*/}

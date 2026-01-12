import { FormField } from "./FormField";
import type { FieldValues } from "react-hook-form";
import type { FormFieldProps } from "./types";

type RadioOption = {
  label: string;
  value: string | number;
};

type Props<T extends FieldValues> = FormFieldProps<T> & {
  options: RadioOption[];
};

export function RadioGroupField<T extends FieldValues>({
  name,
  label,
  register,
  errors,
  rules,
  show_asterisk,
  options,
}: Props<T>) {
  const errorMessage = errors?.[name]?.message as string | undefined;

  return (
    <FormField label={label} show_asterisk={show_asterisk} error={errorMessage}>
      <div className="flex gap-4">
        {options.map((opt) => (
          <label key={opt.value} className="label cursor-pointer gap-2">
            <input
              type="radio"
              value={opt.value}
              className="radio"
              {...register(name, rules)}
            />
            <span className="label-text">{opt.label}</span>
          </label>
        ))}
      </div>
    </FormField>
  );
}


// Usage
{/* 
    <RadioGroupField<FormData>
        name="gender"
        label="Gender"
        required
        register={register}
        errors={errors}
        rules={{ required: "Gender is required" }}
        options={[
            { label: "Male", value: "M" },
            { label: "Female", value: "F" },
        ]}
    /> 
*/}

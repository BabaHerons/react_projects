import { FormField } from "./FormField";
import type { FormFieldProps } from "./types";
import type { FieldValues } from "react-hook-form";

type Props<T extends FieldValues> = FormFieldProps<T> & {
  type?: "text" | "password" | "email";
  placeholder?: string;
};

export function InputField<T extends FieldValues>({
  name,
  label,
  register,
  errors,
  rules,
  required,
  type = "text",
  placeholder,
  className = "",
}: Props<T>) {
  const errorMessage = errors?.[name]?.message as string | undefined;

  return (
    <FormField label={label} required={required} error={errorMessage}>
      <input
        type={type}
        placeholder={placeholder}
        className={`input ${errorMessage ? "input-error" : ""} ${className}`}
        {...register(name, rules)}
      />
    </FormField>
  );
}


// Usage
{/* 
    <InputField<LoginPayload>
        name='username'
        label="Username"
        required={false}
        register={register}
        errors={errors}
        rules={{
            required: "Username cannot be blank",
            onChange: (e:any) => {
            const value = e.target.value;
            console.log("Username:", value);
            }
        }}
        placeholder="Enter username"
    /> 
*/}

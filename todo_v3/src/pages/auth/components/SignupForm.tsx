import { InputField } from "../../../components/form/InputField";
import { useForm } from "react-hook-form";
import type { SignupPayload } from "../../../api/auth/auth.types";
import { Button } from "../../../components/ui/Button";
import { UserRoundPlus } from "lucide-react";
import { useSignup } from "../../../hooks/useAuth";
import { TextAreaField } from "../../../components/form/TextAreaField";

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

export default function SignupForm({ onSwitchToLogin }: SignupFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupPayload>();

  const signup = useSignup();

  const onSubmit = (data: SignupPayload) => {
    console.log(data);
    signup.mutate(data, {
      onSuccess: () => {
        reset();
        onSwitchToLogin();
      },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="flex flex-col gap-4 bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Signup</legend>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* NAME */}
            <InputField<SignupPayload>
              name="name"
              label="Full Name"
              show_asterisk={true}
              register={register}
              errors={errors}
              rules={{ required: "Full Name cannot be blank" }}
              placeholder="Enter full name"
            />

            {/* USERNAME */}
            <InputField<SignupPayload>
              name="username"
              label="Username"
              show_asterisk={true}
              register={register}
              errors={errors}
              rules={{ required: "Username cannot be blank" }}
              placeholder="Enter username"
            />
          </div>

          {/* EMAIL */}
          <InputField<SignupPayload>
            name="email"
            label="Email"
            type="email"
            show_asterisk={true}
            register={register}
            errors={errors}
            rules={{ required: "Email cannot be blank" }}
            placeholder="Enter email"
          />

          <div className="flex flex-col sm:flex-row gap-4">
            {/* PASSWORD */}
            <InputField<SignupPayload>
              name="password"
              label="Password"
              type="password"
              show_asterisk={true}
              register={register}
              errors={errors}
              rules={{ required: "Password cannot be blank" }}
              placeholder="Enter password"
            />
            {/* MOBILE */}
            <InputField<SignupPayload>
              name="mob"
              label="Mobile"
              type="text"
              show_asterisk={true}
              register={register}
              errors={errors}
              rules={{ required: "Mobile cannot be blank" }}
              placeholder="Enter mobile number"
            />
          </div>

          {/* ADDRESS */}
          <TextAreaField<SignupPayload>
            name="address"
            label="Address"
            show_asterisk={false}
            register={register}
            errors={errors}
            placeholder="Enter address"
          />

          {/* LOGIN BUTTON */}
          <Button
            variant="neutral"
            isLoading={signup.isPending}
            loadingMsg="Adding User"
            className="mt-2"
            icon={<UserRoundPlus />}
            iconPosition="right"
          >
            Sign Up
          </Button>
        </fieldset>

        {/* Login */}
        <div className="mt-4 text-center">
          <p className="text-slate-500 text-sm">
            Already have an account?&nbsp;&nbsp;
            <button
              onClick={onSwitchToLogin}
              type="button"
              className="text-black font-semibold hover:underline hover:cursor-pointer"
            >
              Log In
            </button>
          </p>
        </div>
      </form>
    </>
  );
}

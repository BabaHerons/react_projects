import { useForm } from "react-hook-form";
import { LogIn } from "lucide-react";
import { useLogin } from "../../../hooks/useAuth";
import type { LoginPayload } from "../../../api/auth/auth.types";
import { InputField } from "../../../components/form/InputField";
import { Button } from "../../../components/ui/Button";

interface LoginFormProps {
    onSwitchToSignup: () => void
}

export default function LoginForm({onSwitchToSignup}:LoginFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginPayload>({
    mode: "onBlur",
  });

  const login = useLogin();

  const onsubmit = (data: LoginPayload) => {
    // console.log(data)
    login.mutate(data, {
      onSuccess: (data) => {
        console.log("Logging from the component", data);
        reset(); // for reseting the form upon successful form submission.
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <fieldset className="flex flex-col gap-4 bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

        {/* USERNAME */}
        {/* <label className="label">Username</label>
          <input type="text" className={`input ${errors.username?.message ? "input-error" : ""}`} {...register("username", {required:"Username cannot be blank"})} placeholder="Enter username" />
          {errors.username && (<h6 className="text-red-500">{errors.username.message}</h6>)} */}
        {/* add error text here which is going to be used in input component
         */}

        {/* PASSWORD */}
        {/* <label className="label mt-2">Password</label>
          <input type="password" className={`input ${errors.password?.message ? "input-error" : ""}`} {...register("password", {required:"Password cannot be blank"})} placeholder="Enter password" />
          {errors.password && (<h6 className="text-red-500">{errors.password.message}</h6>)} */}

        {/* LOGIN BUTTON */}
        {/* <button className={`btn btn-neutral mt-4 ${login.isPending ? "text-gray-500" : ""}`} disabled={login.isPending}>
            {
              login.isPending
              ? (<>Loading<span className="loading loading-dots"></span></>)
              : (<>Login</>)
            }
          </button> */}

        {/* USERNAME */}
        <InputField<LoginPayload>
          name="username"
          label="Username"
          show_asterisk={false}
          register={register}
          errors={errors}
          rules={{ required: "Username cannot be blank" }}
          placeholder="Enter username"
        />

        {/* PASSWORD */}
        <InputField<LoginPayload>
          name="password"
          label="Password"
          type="password"
          show_asterisk={false}
          register={register}
          errors={errors}
          rules={{ required: "Password cannot be blank" }}
          placeholder="Enter password"
        />

        {/* LOGIN BUTTON */}
        <Button
          variant="neutral"
          isLoading={login.isPending}
          loadingMsg="Verifying User"
          className="mt-2"
          icon={<LogIn />}
          iconPosition="right"
        >
          Log In
        </Button>
      </fieldset>

      {/* Create Account */}
      <div className="mt-4 text-center">
        <p className="text-slate-500 text-sm">
          Don't have an account?&nbsp;&nbsp;
          <button
            onClick={onSwitchToSignup}
            type="button"
            className="text-black font-semibold hover:underline hover:cursor-pointer"
          >
            Create account
          </button>
        </p>
      </div>
    </form>
  );
}

import { usePageTitle } from "../hooks/usePageTitle";
import { useLogin } from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import type { LoginPayload } from "../api/auth/auth.types";
import { InputField } from "../components/form/InputField";
import { CheckboxField } from "../components/form/CheckboxField";


export default function Login() {
  usePageTitle("Login")

  const { register, handleSubmit, reset, formState: {errors} } = useForm<LoginPayload>({
    mode: "onBlur"
  })

  const login = useLogin()

  const onsubmit = (data:LoginPayload) => {
    // console.log(data)
    login.mutate(data)
  }


  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(onsubmit)}>
        <fieldset className="flex flex-col gap-1 bg-base-200 border-base-300 rounded-box w-xs border p-4">
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
          <button className={`btn btn-neutral mt-4 ${login.isPending ? "text-gray-500" : ""}`} disabled={login.isPending}>
            {
              login.isPending
              ? (<>Loading<span className="loading loading-dots"></span></>)
              : (<>Login</>)
            }
          </button>

          {/* USERNAME */}
          <InputField<LoginPayload>
            name='username'
            label="Username"
            show_asterisk={false}
            register={register}
            errors={errors}
            rules={{required: "Username cannot be blank"}}
            placeholder="Enter username"
          />

          {/* PASSWORD */}
          <InputField<LoginPayload>
            name='password'
            label="Password"
            show_asterisk={false}
            register={register}
            errors={errors}
            rules={{required: "Password cannot be blank"}}
            placeholder="Enter password"
          />
        </fieldset>
      </form>
    </div>
  );
}

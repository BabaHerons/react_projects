import { usePageTitle } from "../hooks/usePageTitle";
import { useLogin } from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import type { LoginPayload } from "../api/auth/auth.types";


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
          <label className="label">Username</label>
          <input type="text" className="input" {...register("username")} placeholder="Enter username" />

          {/* PASSWORD */}
          <label className="label mt-2">Password</label>
          <input type="password" className="input" {...register("password")} placeholder="Enter password" />

          {/* LOGIN BUTTON */}
          <button className={`btn btn-neutral mt-4 ${login.isPending ? "text-gray-500" : ""}`} disabled={login.isPending}>
            {
              login.isPending
              ? (<>Loading<span className="loading loading-dots"></span></>)
              : (<>Login</>)
            }
          </button>
        </fieldset>
      </form>
    </div>
  );
}

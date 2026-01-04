// import { useEffect } from "react";
// import { userHooks } from "../hooks/user/user.hooks";
// import { toast } from "react-toastify";

import { useForm } from "react-hook-form";
import type { Todo } from "../api/todo/todo.types";
import { usePageTitle } from "../hooks/usePageTitle";

export default function Todos() {
  usePageTitle("Home")
  // const { useList, useCreate, useUpdate, useDelete } = userHooks
  // const { data: users, isFetching, isLoading, isError, error } = useList()

  // useEffect(() => {
  //   if (isError){
  //     console.log('Error', error)
  //     toast.error(error?.response?.data?.message)
  //   }
  //   console.log(users)
  // },[isError, users])

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<Partial<Todo>>({
    // defaultValues: {
    //   completed: false
    // },
    mode: "onBlur"
  })

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl">Todos Page</h1>
      {/* <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}> */}
      <form className="flex flex-col gap-2" >
        <div className="flex flex-col gap-1">
          <label>Title</label>
          <input className={`input ${errors.title?.message ? "input-error" : ""}`} placeholder="Enter here" {...register("title", {
            required: "Title cannot be blank"
          })} />
          {errors.title && (<h6 className="text-red-500">{errors.title.message}</h6>)}
        </div>
        {/* <div> */}
          {/* <button type="submit" className="btn btn-soft" disabled={createTodo.isPending}>
            {createTodo.isPending ? (<><span className="loading loading-spinner"></span>Loading</>): ("Create Todo")}
          </button> */}
        {/* </div> */}
        {/* <div>
          <Button
            type="submit"
            variant="contained"
          >
            Create TODO
          </Button>
        </div> */}
      </form>
    </div>
  );
}

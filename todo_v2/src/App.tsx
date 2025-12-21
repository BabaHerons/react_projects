import { toast } from "react-toastify";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTodoMutations } from "./hooks/todo/useTodoMutations";
import { useTodos } from "./hooks/todo/useTodos";
import React from "react";
// import TextField  from "@mui/material/TextField";
import type { Todo } from "./api/todo/todo.types";
import { useForm } from "react-hook-form";


function App() {
  const { createTodo } = useTodoMutations()
  const { data: todos, isLoading, isError } = useTodos()

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<Partial<Todo>>({
    defaultValues: {
      completed: false
    },
    mode: "onBlur"
  })
  const onSubmit = (data:Partial<Todo>) => {
    // toast.info("This is working")
    // console.log(data)
    console.log("Errors from useForm:", errors)
    createTodo.mutate(data)
    reset()
  }

  // To watch on any change on any input field we can write useEffect
  // const title = watch("title")
  // useEffect(() => {
  //   console.log("Title: ", title)
  // },[title])
  

  return (
    <div className="flex flex-col justify-center items-center">
      <Typography variant="h1" gutterBottom>
        Todo V2
      </Typography>

      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1">
          {/* <TextField label="Title" {...register("title", {
            required: true,
            // onChange: (e:React.ChangeEvent<HTMLInputElement>) => {
            //   const { name, value } = e.target
            //   console.log(name)
            //   console.log(value)
            // }
          })}></TextField> */}
          <label>Title</label>
          <input className={`input ${errors.title?.message ? "input-error" : ""}`} placeholder="Enter here" {...register("title", {
            required: "Title cannot be blank"
          })} />
          {errors.title && (<h6 className="text-red-500">{errors.title.message}</h6>)}
          {/* <Typography variant="body1" color="red" gutterBottom>Todo V2</Typography> */}
          {/* <TextField variant="outlined" label="Description" {...register("description")}></TextField> */}
        </div>
        <div><button type="submit" className="btn btn-soft">Create Todo</button></div>
        {/* <div>
          <Button
            type="submit"
            variant="contained"
          >
            Create TODO
          </Button>
        </div> */}
      </form>
      <br />

      {/* Table to display the TODOS */}
      <div className="flex items-center justify-center">
        <table>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>ID</th>
              <th>Title</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {todos?.map((todo, index) => (
              <React.Fragment key={todo.id}>
                <tr>
                  <td className="p-1">{index+1}.</td>
                  <td className="p-1">{todo.id}</td>
                  <td className="p-1">{todo.title}</td>
                  <td className="p-1">{String(todo.completed)}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

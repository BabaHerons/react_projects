// import { toast } from "react-toastify";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTodoMutations } from "./hooks/todo/useTodoMutations";
import { useTodos } from "./hooks/todo/useTodos";
import React from "react";
// import TextField  from "@mui/material/TextField";
import type { Todo } from "./api/todo/todo.types";
import { useForm } from "react-hook-form";


function App() {
  const { createTodo, updateTodo, deleteTodo } = useTodoMutations()
  const { data: todos, isFetching, isLoading, isError } = useTodos()

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<Partial<Todo>>({
    defaultValues: {
      completed: false
    },
    mode: "onBlur"
  })
  const onSubmit = async (data:Partial<Todo>) => {
    // toast.info("This is working")
    // console.log(data)
    await createTodo.mutateAsync(data)
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
          {/* <TextField variant="outlined" label="Description" {...reg<button type="submit" className="btn btn-soft" disabled><span className="loading loading-spinner"></span>Loading</button>ister("description")}></TextField> */}
        </div>
        {/* <div> */}
          <button type="submit" className="btn btn-soft" disabled={createTodo.isPending}>
            {createTodo.isPending ? (<><span className="loading loading-spinner"></span>Loading</>): ("Create Todo")}
          </button>
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
      <br />

      {/* Table to display the TODOS */}
      <div className="flex items-center justify-center">
        <table>
          <thead>
            <tr>
              <th className="p-1.5">S.No.</th>
              <th className="p-1.5">ID</th>
              <th className="p-1.5">Title</th>
              <th className="p-1.5">Completed</th>
              <th className="p-1.5">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (<tr><td colSpan={8} className="text-center">Loading &nbsp;<span className="loading loading-dots"></span></td></tr>)}
            {isFetching && !isLoading && (<tr><td colSpan={8} className="text-center">Refreshing &nbsp;<span className="loading loading-dots"></span></td></tr>)}
            {!isFetching && !isLoading && todos?.length===0 && (<tr><td colSpan={8} className="text-center text-gray-400">No data found</td></tr>)}
            {todos?.map((todo, index) => (
              <tr>
                <td className="p-1">{index+1}.</td>
                <td className="p-1">{todo.id}</td>
                <td className="p-1">{todo.title}</td>
                <td className="p-1">{String(todo.completed)}</td>
                <td className="p-1 flex gap-1">
                  {!todo.completed && (
                    <button 
                      className="btn btn-soft btn-success" 
                      disabled={updateTodo.isPending && updateTodo.variables?.id === todo.id} 
                      onClick={() => updateTodo.mutate({id:todo.id, data:{completed:true}})}
                    >
                      {updateTodo.isPending && updateTodo.variables?.id === todo.id ? (<span className="loading loading-spinner"></span>): ("Done")}
                    </button>
                  )}
                  <button 
                    className="btn btn-soft btn-error" 
                    disabled={deleteTodo.isPending && deleteTodo.variables?.id === todo.id}
                    onClick={() => deleteTodo.mutate({id:todo.id})}
                    >
                      {deleteTodo.isPending && deleteTodo.variables?.id === todo.id ? (<span className="loading loading-spinner"></span>): ("Remove")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

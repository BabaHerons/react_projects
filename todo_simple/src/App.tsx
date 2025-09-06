import { useState } from 'react'
import './App.css'

interface toDo {
  task_name: string,
  description: string,
  status: boolean,
  date: Date | string
}

const makeEmptyTodo = ():toDo => ({
  task_name: "",
  description: "",
  status: false,
  date: ""
})

function App() {
  // const [count, setCount] = useState(0)
  // const [todo, setTodo] = useState<toDo>({
  //   task_name: "",
  //   description: "",
  //   status: false,
  //   date: ""
  // })

  const [todo, setTodo] = useState<toDo>(makeEmptyTodo())

  const [todos, setTodos] = useState<toDo[]>([])

  function submit() {
    const newTodo = {
      ...todo,
      date: new Date().toISOString()
    }

    const updatedTodos = [
      ...todos,
      newTodo
    ]
    setTodos(updatedTodos)
    console.log("Todo: ", newTodo)
    console.log("Todo List: ", updatedTodos)

    // Resetting the form
    // setTodo({
    //   task_name: "",
    //   description: "",
    //   status: false,
    //   date: ""
    // })
    setTodo(makeEmptyTodo())
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    const { value, name } = e.target ?? {}
    // console.log(name, value)
    // console.log(e.target)
    setTodo((prev:toDo) => ({
      ...prev,
      [name]: value
    }))
  }

  function handleDelete(task_name:string, desc:string){
    const updatedTodos = todos.filter((item:toDo) => !(item.task_name === task_name && item.description === desc))
    setTodos(updatedTodos)
  }

  function updateStatus(givenTodo:toDo){
    const updatedTodos = todos.map((item:toDo) => {
      if (item.task_name === givenTodo.task_name && item.description === givenTodo.description){
        // we should not use this as the reference of the object is same and hence no re-render happen for this one
        // instead we should return the new object.
        // item.status = true
        // return item
        return {...item, status:true}
      }
      return item
    })
    setTodos(updatedTodos)
  }

  return (
    <>
      <div className='container m-auto '>
        <h1 className='text-5xl font-mono text-rose-400 font-bold my-4 flex justify-center'>Todo Tracker</h1>
        <span className='font-bold text-2xl bg-purple-200 p-2 rounded-2xl font-sans'>Add a todo</span>

        {/* FORM FOR TODO */}
        <div className=' flex justify-center rounded-2xl mt-4'>
          <form className='flex border rounded-lg p-4'>
            {/* Task name */}
            <div className="m-4">
              <p className="font-bold">Task Name</p>
              <input
                className="input"
                type="text"
                name="task_name"
                value={todo.task_name}
                placeholder="Add name"
                onChange={handleChange}
              />
            </div>

            {/* Task Description */}
            <div className="m-4">
              <p className="font-bold">Task Description</p>
              <input
                className="input"
                type="text"
                name="description"
                value={todo.description}
                placeholder="Add description"
                onChange={handleChange}
              />
            </div>

            {/* Button */}
            <button
              type="button"
              className="btn bg-amber-200 hover:bg-amber-300"
              onClick={submit}
            >
              Submit
            </button>
          </form>
        </div>

        {/* TABLE SHOING THE TODOS */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white">
              TODOS
              <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Browse a list of all the todos at one place.</p>
            </caption>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">S.No.</th>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Description</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Date Added</th>
                <th scope="col" className="px-6 py-3"><span className="sr-only">Edit</span></th>
              </tr>
            </thead>
            <tbody>
              {
                todos.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-400">No todos yet</td>
                  </tr>
                ) : (
                  todos.map((t, index) => (
                    <tr key={String(index) + '_todo'} className="bg-white border-b  border-gray-200">
                      <td className="px-6 py-4">{index + 1}.</td>
                      <td className="px-6 py-4">{t.task_name}</td>
                      <td className="px-6 py-4">{t.description}</td>
                      <td className="px-6 py-4">{String(t.status)}</td>
                      <td className="px-6 py-4">{t.date.toLocaleString()}</td>
                      <td className="px-6 py-4 text-right">{!t.status && (<span className="font-medium text-emerald-600 hover:underline hover:cursor-pointer" onClick={() => updateStatus(t)}>Mark Complete</span>)}<span className="font-medium ml-2 text-red-600 hover:underline hover:cursor-pointer" onClick={()=>handleDelete(t.task_name, t.description)}>Delete</span></td>
                    </tr>
                  ))
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;

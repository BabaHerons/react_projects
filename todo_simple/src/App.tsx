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

  return (
    <>
      <div className='container m-auto '>
        <h1 className='text-5xl font-mono text-rose-400 font-bold my-4 flex justify-center'>Todo Tracker</h1>
        <span className='font-bold text-2xl bg-purple-200 p-2 rounded-2xl font-sans'>Add a todo</span>
        <div className=' flex justify-center rounded-2xl mt-4'>
          <form className='flex border rounded-lg p-4'>
            {/* Task name */}
            <div className='m-4'>
              <p className='font-bold'>Task Name</p>
              <input className='input' type="text" name='task_name' value={todo.task_name} placeholder='Add name' onChange={handleChange}/>
            </div>

            {/* Task Description */}
            <div className='m-4'>
              <p className='font-bold'>Task Description</p>
              <input className='input' type="text" name='description' value={todo.description} placeholder='Add description' onChange={handleChange}/>
            </div>

            {/* Button */}
            <button type='button' className='btn bg-amber-200 hover:bg-amber-300' onClick={submit}>Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default App

import { useForm } from "react-hook-form";
import type { Todo } from "../api/todo/todo.types";
import { usePageTitle } from "../hooks/usePageTitle";
import { getActiveUser } from "../utils/user";
import { todoHooks } from "../hooks/todo/todo.hooks";
import { LoadingButton } from "../components/ui/LoadingButton";
import { useEffect, useState } from "react";

export default function Todos() {
  usePageTitle("Home")
  
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<Partial<Todo>>({
    // defaultValues: {
    //   completed: false
    // },
    mode: "onBlur"
  })

  const { useList, useCreate, useUpdate, useDelete } = todoHooks;
  const { data:todos, isLoading, isFetching } = useList();
  const createTodo = useCreate();
  const updateTodo = useUpdate();
  const deleteTodo = useDelete();

  const user = getActiveUser()
  const userTodos = todos
                      ?.filter(t => t.user_id === user?.id)
                       .sort((a, b) => b.id - a.id) ?? []

  const onSubmit = (data:Partial<Todo>) => {
    createTodo.mutate({...data, user_id:user?.id}, {
      onSuccess: () => {
        reset()
      }
    })
  }

  const [selectedTodo, setSelectedTodo] = useState<Todo>()

  const toggleTodo = (todo:Todo) => {
    setSelectedTodo(todo)
    updateTodo.mutate({
      id: todo.id, 
      data: {
        completed: !todo.completed
      }
    }
  )
  }

  useEffect(() => {
    setSelectedTodo(undefined)
  }, [todos])

  return (
    <div className="flex flex-col items-center justify-center">
      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Hello, {user?.name.split(' ')[0]} 👋</h1>
          <p className="text-slate-500 mt-2 text-lg">You have {userTodos?.filter(t => !t.completed).length} tasks remaining today.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Your Profile</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Full Name</label>
                  <p className="text-slate-800 font-semibold">{user?.name}</p>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Username</label>
                  <p className="text-slate-800 font-semibold">{user?.username}</p>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Email Address</label>
                  <p className="text-slate-800 font-semibold truncate">{user?.email}</p>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Mobile</label>
                  <p className="text-slate-800 font-semibold">{user?.mob}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Todo List */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="relative group">
              <input
                type="text"
                {...register("title", {required: "Name cannot be blank"})}
                placeholder="What needs to be done?"
                className="w-full pl-6 pr-24 py-5 bg-white rounded-3xl border border-slate-200 shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-slate-700 text-lg placeholder:text-slate-300"
              />{
                createTodo.isPending
                ? <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <LoadingButton />
                </div>
                : <button 
                    type="submit"
                    className="btn absolute right-3 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-2xl hover:bg-indigo-700 transition-all active:scale-[0.98] shadow-lg shadow-indigo-100"
                  >
                    Add
                  </button>
              }
            </form>

            <div className="space-y-3">
              {isLoading ? (<div className="flex items-center justify-center text-gray-600">Loading&nbsp;<span className="loading loading-dots text-gray-600"></span></div>) :''}
              {/* {isFetching && (userTodos?.length! > 0) ? (<div className="flex items-center justify-center text-gray-600">Fetching&nbsp;<span className="loading loading-dots text-gray-600"></span></div>) :''} */}
              {userTodos?.length === 0 && !isLoading && !isFetching ? (
                <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Your list is empty</h3>
                  <p className="text-slate-500 mt-1">Start by adding your first task above!</p>
                </div>
              ) : (
                userTodos?.map(todo => (
                  <div 
                    key={todo.id} 
                    className={`group flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md hover:border-indigo-100 ${todo.completed ? 'bg-slate-50/50 opacity-75' : ''}`}
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      {
                        // (updateTodo.isPending && (selectedTodo?.id === todo.id)) || (selectedTodo?.id === todo.id)
                        selectedTodo?.id === todo.id
                        ? <LoadingButton loadingMsg=""/> 
                        : <button
                            onClick={() => toggleTodo(todo)}
                            className={`w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all hover:cursor-pointer ${
                              todo.completed 
                              ? 'bg-emerald-500 border-emerald-500 text-white scale-110' 
                              : 'border-slate-200 hover:border-indigo-500 bg-white'
                            }`}
                          >
                            {todo.completed && (
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </button>
                      }
                      <span className={`text-slate-700 font-semibold text-base transition-all ${todo.completed ? 'line-through text-slate-400' : ''}`}>
                        {todo.title}
                      </span>
                    </div>
                    <button
                      // onClick={() => deleteTodo(todo.id)}
                      className="p-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all rounded-lg hover:bg-red-50 hover:cursor-pointer"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

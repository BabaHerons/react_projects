import { useForm } from "react-hook-form";
import type { Todo } from "../api/todo/todo.types";
import { usePageTitle } from "../hooks/usePageTitle";
import { getActiveUser } from "../utils/user";
import { todoHooks } from "../hooks/todo/todo.hooks";
import { LoadingButton } from "../components/ui/LoadingButton";
import { useState } from "react";
import { CircleCheck, Trash2, LogOut } from "lucide-react";
import { LoadingOverlay } from "../components/ui/LoadingOverlay";
import { Button } from "../components/ui/Button";
import { useLogout } from "../hooks/useAuth";

export default function Todos() {
  usePageTitle("Home")
  
  const { register, handleSubmit, reset } = useForm<Partial<Todo>>({
    // defaultValues: {
    //   completed: false
    // },
    mode: "onBlur"
  })

  const { useList, useCreate, useUpdate, useDelete } = todoHooks;
  const { data: todos, isLoading, isFetching } = useList();
  const createTodo = useCreate();
  const updateTodo = useUpdate();
  const deleteTodo = useDelete();

  const user = getActiveUser();
  const userTodos =
    todos?.filter((t) => t.user_id === user?.id).sort((a, b) => b.id - a.id) ??
    [];

  const onSubmit = (data: Partial<Todo>) => {
    createTodo.mutate(
      { ...data, user_id: user?.id },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  };

  const [selectedTodo, setSelectedTodo] = useState<Set<Todo>>(new Set());

  const addLoadingTodo = (todo:Todo) => {
    setSelectedTodo(prev => {
      const next = new Set(prev)
      next.add(todo)
      return next
    })
  }

  const removeLoadingTodo = (todo:Todo) => {
    setSelectedTodo(prev => {
      const next = new Set(prev)
      next.delete(todo)
      return next
    })
  }

  const toggleTodo = (todo: Todo, method:'UPDATE' | 'DELETE') => {
    addLoadingTodo(todo)
    if (method === 'UPDATE'){
      updateTodo.mutate({
        id: todo.id,
        data: {
          completed: !todo.completed,
        },
      },
      {
        onSettled: () => {
          removeLoadingTodo(todo)
        }
      }
    );
    }
    else if (method === 'DELETE'){
      deleteTodo.mutate(todo.id, {
        onSettled: () => {
          removeLoadingTodo(todo)
        }
      })
    }
  };

  const logout = useLogout()
  const logOut = () => {
    logout.mutate()
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Hello, {user?.name.split(" ")[0]} 👋
          </h1>
          <p className="text-slate-500 mt-2 text-lg">
            You have {userTodos?.filter((t) => !t.completed).length} tasks
            remaining today.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">
                Your Profile
              </h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">
                    Full Name
                  </label>
                  <p className="text-slate-800 font-semibold">{user?.name}</p>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">
                    Username
                  </label>
                  <p className="text-slate-800 font-semibold">
                    {user?.username}
                  </p>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">
                    Email Address
                  </label>
                  <p className="text-slate-800 font-semibold truncate">
                    {user?.email}
                  </p>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">
                    Mobile
                  </label>
                  <p className="text-slate-800 font-semibold">{user?.mob}</p>
                </div>
                <div>
                  <Button 
                    onClick={logOut}
                    isLoading={logout.isPending}
                    loadingMsg=""
                    variant="error"
                    className={`w-full ${logout.isPending ? '': 'bg-red-800 text-gray-50'}`}
                    icon={<LogOut />}
                    iconPosition="right"
                  >Log Out</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Todo List */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="relative group">
              <input
                type="text"
                {...register("title", { required: "Name cannot be blank" })}
                placeholder="What needs to be done?"
                className="w-full pl-6 pr-24 py-5 bg-white rounded-3xl border border-slate-200 shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-slate-700 text-lg placeholder:text-slate-300"
              />
              {createTodo.isPending ? (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <LoadingButton />
                </div>
              ) : (
                <button
                  type="submit"
                  className="btn absolute right-3 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-2xl hover:bg-indigo-700 transition-all active:scale-[0.98] shadow-lg shadow-indigo-100"
                >
                  Add
                </button>
              )}
            </form>

            <div className="space-y-3 relative">
              {isLoading ? (
                <div className="flex items-center justify-center text-gray-600">
                  Loading&nbsp;
                  <span className="loading loading-dots text-gray-600"></span>
                </div>
              ) : (
                ""
              )}
              {/* {isFetching && (userTodos?.length! > 0) ? (<div className="flex items-center justify-center text-gray-600">Fetching&nbsp;<span className="loading loading-dots text-gray-600"></span></div>) :''} */}
              {/* {isFetching && (userTodos?.length! > 0) ? (<LoadingOverlay><LoadingButton keepButton={false} loadingMsg=""/></LoadingOverlay>) :''} */}
              {isFetching && (userTodos?.length! > 0) ? (<LoadingOverlay />) :''}
              {userTodos?.length === 0 && !isLoading && !isFetching ? (
                <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-10 h-10 text-slate-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Your list is empty
                  </h3>
                  <p className="text-slate-500 mt-1">
                    Start by adding your first task above!
                  </p>
                </div>
              ) : (
                userTodos?.map((todo) => (
                  <div className="relative">
                    <div
                      key={todo.id}
                      className={`group flex items-center justify-between p-5 rounded-2xl border border-slate-200  shadow-sm transition-all hover:shadow-md hover:border-indigo-100 ${
                        todo.completed
                          ? "bg-slate-50/50 opacity-75"
                          : "bg-white"
                      }`}
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        {selectedTodo.has(todo) && false ? (
                          <LoadingButton loadingMsg="" />
                        ) : (
                          <button
                            onClick={() => toggleTodo(todo, "UPDATE")}
                            className={`w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all hover:cursor-pointer ${
                              todo.completed
                                ? "bg-emerald-500 border-emerald-500 text-white scale-110"
                                : "border-slate-200 hover:border-indigo-500 bg-white"
                            }`}
                          >
                            {todo.completed && <CircleCheck />}
                          </button>
                        )}
                        <span
                          className={`text-slate-700 font-semibold text-base transition-all ${
                            todo.completed ? "line-through text-slate-400" : ""
                          }`}
                        >
                          {todo.title}
                        </span>
                      </div>
                      <button
                        onClick={() => toggleTodo(todo, "DELETE")}
                        className="p-2 text-slate-300 hover:text-red-500 transition-all rounded-lg hover:bg-red-50 hover:cursor-pointer"
                      >
                        <Trash2 />
                      </button>
                    </div>

                    {/* 🔥 LOADING OVERLAY */}
                    {selectedTodo.has(todo) && (<LoadingOverlay isSkeleton={false}><LoadingButton keepButton={false} loadingMsg=""/></LoadingOverlay>)}
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

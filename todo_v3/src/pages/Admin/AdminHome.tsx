import { useState } from "react";
import Users from "./components/Users";
import Todos from "./components/Todos";
import Logs from "./components/Logs";
import { auditLogsHooks } from "../../hooks/auditLogs/auditLogs.hooks";
import { userHooks } from "../../hooks/user/user.hooks";
import { todoHooks } from "../../hooks/todo/todo.hooks";
import { useLogout } from "../../hooks/useAuth";
import { Button } from "../../components/ui/Button";
import { LogOut } from "lucide-react";

export default function AdminHome() {
  const [activeTab, setActiveTab] = useState("users");

  // lOGS COUNT
  const { useList: useLogs } = auditLogsHooks;
  const { data: logs } = useLogs();

  // TOTAL USERS
  const { useList: useUsers } = userHooks;
  const { data: users } = useUsers();

  // GLOBAL TASKS
  const { useList: useTodos } = todoHooks;
  const { data: todos } = useTodos();

  const logout = useLogout();
  const logOut = () => {
    logout.mutate();
  };

  return (
    <>
      {/* Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold flex items-center space-x-2">
              <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded uppercase tracking-tighter">
                Admin
              </span>
              <span className="text-slate-900">Task Management</span>
            </h1>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              onClick={logOut}
              isLoading={logout.isPending}
              variant="error"
              className={`w-full rounded-lg ${
                logout.isPending ? "" : "bg-red-800 text-gray-50"
              }`}
              icon={<LogOut />}
              iconPosition="right"
            >
              Log Out
            </Button>
          </div>
        </div>
      </header>
      {/* Stats Bar */}
      <div className="max-w-7xl mx-auto w-full px-6 pt-8 grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
            Total Users
          </p>
          <p className="text-3xl font-black mt-1 text-slate-800">
            {users?.length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
            Global Tasks
          </p>
          <p className="text-3xl font-black mt-1 text-slate-800">
            {todos?.length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
            Logs Count
          </p>
          <p className="text-3xl font-black mt-1 text-slate-800">
            {logs?.length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
            System Health
          </p>
          <p className="text-3xl font-black mt-1 text-emerald-600">Active</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto w-full px-6 mt-8 flex space-x-1 border-b border-slate-200">
        {(["users", "todos", "logs"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-4 text-sm font-bold capitalize transition-all border-b-2 hover:cursor-pointer ${
              activeTab === tab
                ? "border-emerald-600 text-emerald-600 bg-white rounded-t-lg"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* User, Todos, Logs */}
      <main className="max-w-7xl mx-auto w-full p-6 flex-1">
        {activeTab === "users" && <Users />}
        {activeTab === "todos" && <Todos />}
        {activeTab === "logs" && <Logs />}
      </main>
    </>
  );
}

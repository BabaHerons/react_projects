import { todoHooks } from "../../../hooks/todo/todo.hooks";

export default function Todos(){
    const { useList } = todoHooks;
    const { data: todos } = useList();

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {todos?.length === 0 && <p className="text-slate-400 italic">No tasks created globally.</p>}
            {todos?.map(todo => (
              <div key={todo.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded">{todo.user_id}</span>
                  <div className={`text-[10px] font-bold px-2 py-0.5 rounded ${todo.completed ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                    {todo.completed ? 'DONE' : 'PENDING'}
                  </div>
                </div>
                <p className={`text-sm font-medium ${todo.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{todo.title}</p>
                <div className="mt-4 pt-4 border-t border-slate-50 flex justify-centeritems-center text-[10px] text-slate-400">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {todo.created_at}
                </div>
              </div>
            ))}
          </div>
        </>
    )
}
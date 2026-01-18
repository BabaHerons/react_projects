import { userHooks } from "../../../hooks/user/user.hooks";

export default function Users() {
  const { useList } = userHooks;
  const { data: users } = useList();

  return (
    <>
      <div className="bg-white rounded-2xl overflow-x-auto overflow-hidden border border-slate-200 shadow-sm">
        {/* <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
            <tr>
              <th className="px-6 py-4">S.No.</th>
              <th className="px-6 py-4">User ID</th>
              <th className="px-6 py-4">Full Name</th>
              <th className="px-6 py-4">Username</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Account Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
                {users?.map((u, idx) => (
                  <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-800">{idx+1}.</td>
                    <td className="px-6 py-4 font-semibold text-slate-800">{u.id}</td>
                    <td className="px-6 py-4 font-semibold text-slate-800">{u.name}</td>
                    <td className="px-6 py-4 text-slate-500">{u.username}</td>
                    <td className="px-6 py-4 text-slate-500">{u.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${u.role === 'admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-600'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className={`w-2 h-2 rounded-full mr-2 ${u.is_active ? 'bg-emerald-500 shadow-lg shadow-emerald-200' : 'bg-red-500 shadow-lg shadow-red-200'}`}></span>
                        <span className="text-slate-600 font-medium">{u.is_active ? 'Active' : 'Deactivated'}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
        </table> */}
        <table className="text-left w-full overflow-x-auto">
          <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
            <tr>
              <th className="px-6 py-4">S.No.</th>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {users?.map((u, idx) => (
              <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                {/* S.No */}
                <td className="px-6 py-4 font-semibold text-slate-800">
                  {idx + 1}.
                </td>
                {/* USER INFO CELL */}
                <td className="px-6 py-4">
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                      {u.name?.[0]}
                    </div>
                    {/* User Details */}
                    <div className="leading-tight">
                      <p className="font-semibold text-slate-800">{u.name}</p>
                      <p className="text-xs text-slate-500">
                        @{u.username} · ID: {u.id}
                      </p>
                      <p className="text-xs text-slate-400">{u.email}</p>
                    </div>
                  </div>
                </td>
                {/* ROLE */}
                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider
                    ${
                      u.role === "admin"
                        ? "bg-indigo-100 text-indigo-700"
                        : "bg-emerald-100 text-emerald-600"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                {/* STATUS */}
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <span
                      className={`w-2 h-2 rounded-full mr-2
                      ${
                        u.is_active
                          ? "bg-emerald-500 shadow-emerald-200"
                          : "bg-red-500 shadow-red-200"
                      }`}
                    ></span>
                    <span className="text-slate-600 font-medium">
                      {u.is_active ? "Active" : "Deactivated"}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

import { useState } from "react";
import { auditLogsHooks } from "../../../hooks/auditLogs/auditLogs.hooks";
import { LoadingButton } from "../../../components/ui/LoadingButton";

export default function Logs() {
  const { useList } = auditLogsHooks;
  const { data: logs, isLoading } = useList();

  const getEventColor = (event: string) => {
    switch (event) {
      case "Log_in":
        return "text-blue-400";
      case "Log_out":
        return "text-slate-400";
      case "POST":
        return "text-emerald-400";
      case "PATCH":
        return "text-amber-400";
      case "DELETE":
        return "text-rose-400";
      // case 'SIGNUP': return 'text-purple-400';
      default:
        return "text-indigo-400";
    }
  };
  const [logFilter, setLogFilter] = useState<
    "ALL" | "Log_in" | "Log_out" | "POST" | "PATCH" | "DELETE"
  >("ALL");
  const filteredLogs =
    logFilter === "ALL" ? logs : logs?.filter((l) => l.action === logFilter);

  return (
    <>
      <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl overflow-hidden border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h3 className="text-indigo-400 text-xs font-bold uppercase tracking-widest flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            Live System Audit Logs
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              {
                label: "All",
                value: "ALL",
                color: "bg-slate-700 text-slate-300",
              },
              {
                label: "Login",
                value: "Log_in",
                color: "bg-blue-900/40 text-blue-400",
              },
              {
                label: "Logout",
                value: "Log_out",
                color: "bg-slate-800 text-slate-400",
              },
              {
                label: "POST",
                value: "POST",
                color: "bg-emerald-900/40 text-emerald-400",
              },
              {
                label: "PATCH",
                value: "PATCH",
                color: "bg-amber-900/40 text-amber-400",
              },
              {
                label: "Delete",
                value: "DELETE",
                color: "bg-rose-900/40 text-rose-400",
              },
              //   { label: 'Signup', value: 'SIGNUP', color: 'bg-purple-900/40 text-purple-400' },
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setLogFilter(filter.value as any)}
                className={`px-3 py-1 rounded text-[10px] font-black uppercase transition-all ${
                  logFilter === filter.value
                    ? `${filter.color} ring-1 ring-inset ring-white/20`
                    : "bg-slate-800 text-slate-500 hover:text-slate-300"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1 font-mono text-[11px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 pr-2">
          {filteredLogs?.length === 0 && (
            <p className="text-slate-600 italic py-4">
              No events found for this criteria.
            </p>
          )}
          {isLoading ? (
            <LoadingButton />
          ) : (
            //   : filteredLogs?.map(log => (
            //         <div key={log.id} className="py-2 border-b border-slate-800/50 flex flex-col sm:flex-row sm:space-x-3 items-start group">
            //         <span className="text-slate-300 whitespace-nowrap opacity-60">[{log.created_at}]</span>
            //         <div className="flex space-x-3 items-center mt-1 sm:mt-0">
            //             <span className={`font-extrabold text-xs ${getEventColor(log.action)}`}>{log.action}</span>
            //             <div className="flex items-center gap-2 text-sm text-slate-400">
            //                 <span className="font-semibold text-slate-300">{log.actor_name}</span>
            //                 <span className="text-xs bg-slate-700 px-2 py-0.5 rounded">{log.actor_role}</span>
            //                 <span className="text-xs text-slate-500">ID:{log.actor_id}</span>
            //             </div>
            //         </div>
            //         <span className="text-slate-300 group-hover:text-white transition-colors mt-1 sm:mt-0">{log.entity_type}</span>
            //         </div>
            //     ))}
            filteredLogs?.map((log) => (
              <div
                key={log.id}
                className="py-1 border-b border-slate-800/50 flex flex-col gap-1 group"
              >
                {/* Top Row */}
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className="text-slate-300 opacity-60">
                    [{log.created_at}]
                  </span>

                  <span
                    className={`font-extrabold ${getEventColor(log.action)}`}
                  >
                    {log.action}
                  </span>

                  <span className="font-semibold text-slate-300">
                    {log.actor_name}
                  </span>

                  <span className="text-[10px] bg-slate-700 text-gray-200 px-2 py-0.5 rounded">
                    {log.actor_role}
                  </span>

                  <span className="text-[10px] text-slate-500">
                    ID:{log.actor_id}
                  </span>

                  <span className="text-slate-300 group-hover:text-white transition-colors">
                    {log.entity_type}:{log.entity_id}
                  </span>

                  {log.status && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {log.status}
                    </span>
                  )}
                </div>

                {/* Secondary Metadata */}
                <div className="text-[10px] text-slate-500 flex flex-wrap gap-3 pl-1">
                  {log.source && <span>Source: {log.source}</span>}
                  {log.ip_address && <span>IP: {log.ip_address}</span>}
                  {log.request_id && <span>Req: {log.request_id}</span>}
                </div>

                {/* Expandable Details */}
                {(log.old_data || log.new_data || log.failure_reason) && (
                  <details className="pl-1 text-[10px] text-slate-400">
                    <summary className="cursor-pointer hover:text-slate-300">
                      View details
                    </summary>

                    {log.failure_reason && (
                      <p className="text-rose-400 mt-1">
                        Failure: {log.failure_reason}
                      </p>
                    )}

                    <div className="flex">
                      {log.old_data && (
                        <pre className="mt-2 bg-slate-900/60 p-2 rounded text-slate-400 overflow-x-auto">
                          <strong className="text-slate-300">Old:</strong>
                          {JSON.stringify(log.old_data, null, 2)}
                        </pre>
                      )}
                      {log.new_data && (
                        <pre className="mt-2 bg-slate-900/60 p-2 rounded text-emerald-400 overflow-x-auto">
                          <strong className="text-slate-300">New:</strong>
                          {JSON.stringify(log.new_data, null, 2)}
                        </pre>
                      )}
                    </div>
                  </details>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

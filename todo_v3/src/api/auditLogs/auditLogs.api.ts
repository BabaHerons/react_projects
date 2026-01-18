import { axiosInstance } from "../axiosInstance";
import { crudFactory } from "../crudFactory";
import type { AuditLogs } from "./auditLogs.types";

export const auditLogsApi = crudFactory<AuditLogs>(axiosInstance, "/logs?entries=10000000")
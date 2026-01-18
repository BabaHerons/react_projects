import type { AuditLogs } from "../../api/auditLogs/auditLogs.types";
import { auditLogsApi } from "../../api/auditLogs/auditLogs.api";
import { hookFactory } from "../hookFactory";

export const auditLogsHooks = hookFactory<AuditLogs>(['auditLogs'], auditLogsApi)
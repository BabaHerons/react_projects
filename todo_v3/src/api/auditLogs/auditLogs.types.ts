export interface AuditLogs {
    id: number;
    actor_id: string;
    actor_role: string;
    actor_name: string;
    action: string;
    entity_type: string;
    entity_id: string;
    old_data?: JSON;
    new_data?: JSON;
    ip_address?: string;
    user_agent?: string;
    request_id?: string;
    source?: string;
    status?: string;
    failure_reason?: string;
    created_at: string;
}
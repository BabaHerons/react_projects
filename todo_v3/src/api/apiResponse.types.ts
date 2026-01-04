export interface ApiList<T> {
  message?: string;
  records: T[];
}

export interface ApiSingle<T> {
  message?: string;
  record: T;
}

export interface ApiMessage {
  message: string;
}
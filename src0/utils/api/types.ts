export class APIError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly code?: string,
    public readonly data?: unknown
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export interface APIErrorResponse {
  message: string;
  code?: string;
  data?: unknown;
}

export interface APIRequestConfig extends RequestInit {
  timeout?: number;
  params?: Record<string, string>;
}

export interface APIResponse<T = unknown> {
  data: T;
  status: number;
  headers: Headers;
}

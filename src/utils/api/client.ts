import ENV from '../../config/env';
import { secureStorage } from '../secureStorage';
import { APIError, APIErrorResponse, APIRequestConfig, APIResponse } from './types';

const AUTH_TOKEN_KEY = 'auth_token';

/**
 * Handles API response and throws appropriate errors
 */
async function handleResponse<T>(response: Response): Promise<APIResponse<T>> {
  const contentType = response.headers.get('content-type');
  const isJson = contentType?.includes('application/json');
  
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const error = isJson ? data as APIErrorResponse : { message: data };
    throw new APIError(
      error.message || 'An unexpected error occurred',
      response.status,
      error.code,
      error.data
    );
  }

  return {
    data: data as T,
    status: response.status,
    headers: response.headers,
  };
}

/**
 * Creates an AbortController with timeout
 */
function createAbortController(timeout?: number): AbortController {
  const controller = new AbortController();
  if (timeout) {
    setTimeout(() => controller.abort(), timeout);
  }
  return controller;
}

/**
 * API client with automatic auth token handling and type safety
 */
export const api = {
  /**
   * Set the auth token in secure storage
   */
  async setToken(token: string): Promise<void> {
    await secureStorage.set(AUTH_TOKEN_KEY, token);
  },

  /**
   * Remove the auth token from secure storage
   */
  async clearToken(): Promise<void> {
    await secureStorage.remove(AUTH_TOKEN_KEY);
  },

  /**
   * Make an API request with automatic auth token handling
   */
  async request<T = unknown>(
    endpoint: string,
    config: APIRequestConfig = {}
  ): Promise<APIResponse<T>> {
    const {
      timeout = ENV.API_TIMEOUT,
      params,
      headers = {},
      ...init
    } = config;

    // Add query parameters
    const url = new URL(endpoint, ENV.API_URL);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    // Setup abort controller for timeout
    const controller = createAbortController(timeout);

    try {
      // Add auth token if available
      const token = await secureStorage.get<string>(AUTH_TOKEN_KEY);
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      // Make the request
      const response = await fetch(url.toString(), {
        ...init,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...headers,
        },
        signal: controller.signal,
      });

      return handleResponse<T>(response);
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new APIError('Request timeout', 408);
        }
        throw new APIError(error.message);
      }
      throw new APIError('An unexpected error occurred');
    }
  },

  // Convenience methods
  async get<T = unknown>(
    endpoint: string,
    config?: APIRequestConfig
  ): Promise<APIResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  },

  async post<T = unknown>(
    endpoint: string,
    data?: unknown,
    config?: APIRequestConfig
  ): Promise<APIResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async put<T = unknown>(
    endpoint: string,
    data?: unknown,
    config?: APIRequestConfig
  ): Promise<APIResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async patch<T = unknown>(
    endpoint: string,
    data?: unknown,
    config?: APIRequestConfig
  ): Promise<APIResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  async delete<T = unknown>(
    endpoint: string,
    config?: APIRequestConfig
  ): Promise<APIResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  },
};

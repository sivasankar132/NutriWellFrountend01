/**
 * Core HTTP client for NutriWell FastAPI Backend
 */

export class ApiError extends Error {
  public status: number;
  public details: any;

  constructor(status: number, message: string, details?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

const TOKEN_KEY = 'nutriwell_auth_token';
const USER_KEY = 'nutriwell_auth_user';

const envApiUrl = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_API_BASE_URL : undefined;
const isProd = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.PROD : false;

export const API_BASE_URL: string = envApiUrl || (isProd ? 'https://nutri-well0101.vercel.app' : 'http://127.0.0.1:8000');

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  public getToken(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  }

  public setToken(token: string): void {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch (e) {
      console.warn('Failed to save auth token to localStorage', e);
    }
  }

  public clearToken(): void {
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    } catch (e) {
      console.warn('Failed to clear auth token from localStorage', e);
    }
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    let response: Response;
    try {
      response = await fetch(url, {
        ...options,
        headers,
      });
    } catch (err: any) {
      throw new ApiError(
        0, 
        `Network error connecting to NutriWell backend (${this.baseUrl}). Please ensure the server is running.`,
        err
      );
    }

    if (!response.ok) {
      let errorData: any = null;
      let errorMessage = `Request failed with status ${response.status}`;

      try {
        errorData = await response.json();
        if (typeof errorData?.detail === 'string') {
          errorMessage = errorData.detail;
        } else if (Array.isArray(errorData?.detail)) {
          // FastAPI / Pydantic validation error list
          errorMessage = errorData.detail.map((d: any) => `${d.loc?.join('.')} - ${d.msg}`).join(', ');
        } else if (errorData?.message) {
          errorMessage = errorData.message;
        }
      } catch {
        errorMessage = response.statusText || errorMessage;
      }

      if (response.status === 401) {
        // Token invalid or expired
        this.clearToken();
        window.dispatchEvent(new CustomEvent('nutriwell:auth-expired', { detail: { message: errorMessage } }));
      }

      throw new ApiError(response.status, errorMessage, errorData);
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return {} as T;
    }

    try {
      return await response.json();
    } catch {
      return {} as T;
    }
  }

  public get<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', headers });
  }

  public post<T>(endpoint: string, body?: any, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body !== undefined ? JSON.stringify(body) : undefined,
      headers,
    });
  }

  public put<T>(endpoint: string, body?: any, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: body !== undefined ? JSON.stringify(body) : undefined,
      headers,
    });
  }

  public delete<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE', headers });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);

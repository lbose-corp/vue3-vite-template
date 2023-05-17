import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
  withCredentials: true,
});

export type SuccessResDataObjectType<T> = {
  data: T;
  error: null;
  errors: {},
  status: number;
};

export type FailedResErrorObjectType = {
  data: null;
  error: Error;
  errors: Partial<Record<string, string | undefined>>,
  status?: number;
};

async function syncApi<T>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  params = {}
): Promise<SuccessResDataObjectType<T> | FailedResErrorObjectType> {
  try {
    const { data, status } = await api[method]<{ data: T }>(`${url}`, params);
    return {
      data: data.data,
      error: null,
      errors: {},
      status,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        data: null,
        error: new Error(error.response?.data.message ?? error.message),
        errors: error.response?.data.errors ?? {},
        status: error.response?.data.code ?? error.status,
      };
    }
    return {
      status: 500,
      data: null,
      error: new Error("想定しないエラーが発生しました。"),
      errors: {}
    };
  }
}

export async function apiGet<T>(url: string, params = {}) {
  return await syncApi<T>("get", url, params);
}

export async function apiPost<T>(url: string, params = {}) {
  return await syncApi<T>("post", url, params);
}

export async function apiPut<T>(url: string, params = {}) {
  return await syncApi<T>("put", url, params);
}

export async function apiDelete<T>(url: string, params = {}) {
  return await syncApi<T>("delete", url, { data: params });
}

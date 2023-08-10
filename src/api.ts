import axios, { AxiosRequestConfig } from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.API_URL,
})

instance.interceptors.request.use((config) => {
  config.url = (config.url || '').replace(/\/?$/, '/')
  return config
})

instance.interceptors.response.use(
  (data) => data?.data,
  (err) => Promise.reject(err?.response || err?.request || err),
)

const API = <T, D = unknown>(config: AxiosRequestConfig<D>) => instance.request<unknown, T>(config)
API.request = <T, D = unknown>(config: AxiosRequestConfig<D>) =>
  instance.request<unknown, T>(config)
API.get = <T, D = unknown>(url: string, config?: AxiosRequestConfig<D>) =>
  instance.get<unknown, T>(url, config)
API.delete = <T, D = unknown>(url: string, config?: AxiosRequestConfig<D>) =>
  instance.delete<unknown, T>(url, config)
API.options = <T, D = unknown>(url: string, config?: AxiosRequestConfig<D>) =>
  instance.options<unknown, T>(url, config)
API.post = <T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>) =>
  instance.post<unknown, T, D>(url, data, config)
API.put = <T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>) =>
  instance.put<unknown, T, D>(url, data, config)
API.patch = <T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>) =>
  instance.patch<unknown, T, D>(url, data, config)

export { instance }

export default API

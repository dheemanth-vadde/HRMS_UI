import axios, { AxiosInstance } from "axios";
import store from "../store";
import { updateTokens, logout } from "../store/authSlice";

const baseAuthURL = "https://bobjava.sentrifugo.com:8443/hrms-auth-app/api/";
const baseEmployeeURL = "https://bobjava.sentrifugo.com:8443/hrms-employees-app/api/";

const api = axios.create({
  baseURL: baseAuthURL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

export const employeesApi = axios.create({
  baseURL: baseEmployeeURL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// ✅ Reusable interceptor function with proper typing
function attachInterceptors(instance: AxiosInstance) {
  // Request interceptor
  instance.interceptors.request.use(
    (config) => {
        console.log('Request Interceptor - Config:', config);
      const state = store.getState();
      console.log('Current auth state:', state.auth);
      const auth = state.auth;
      if (auth?.token) {
        config.headers["Authorization"] = `Bearer ${auth.token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor (token refresh logic)
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      const state = store.getState();
      const auth = state.auth;

      if (error.response?.status === 401 && auth?.refreshToken && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshRes = await axios.post(baseAuthURL + "auth/refreshtoken", {
            refreshToken: auth.refreshToken,
          });

          store.dispatch(
            updateTokens({
              token: refreshRes.data.accessToken,
              refreshToken: refreshRes.data.refreshToken,
            })
          );

          originalRequest.headers["Authorization"] = `Bearer ${refreshRes.data.accessToken}`;
          return instance(originalRequest);
        } catch (refreshErr) {
          store.dispatch(logout());
          return Promise.reject(refreshErr);
        }
      }
      return Promise.reject(error);
    }
  );
}

// ✅ Attach to both instances
attachInterceptors(api);
attachInterceptors(employeesApi);

export default api;

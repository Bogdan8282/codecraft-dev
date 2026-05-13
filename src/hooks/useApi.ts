import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import api from "../api/axios";

export const useApi = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      async (config) => {
        const token = await getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
    };
  }, [getToken]);

  return api;
};
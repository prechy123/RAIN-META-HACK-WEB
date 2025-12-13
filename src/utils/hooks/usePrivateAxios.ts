
import { axiosInstance as baseAxiosInstance } from "../api/axios";
import { AxiosInstance } from "axios";
import { useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider";

const usePrivateAxios = (instance?: AxiosInstance) => {
  const { token } = useAuth();


  const axiosInstance = instance ?? baseAxiosInstance;

  useEffect(() => {
    const requestIntercept = axiosInstance.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers = config.headers ?? {};

          if (!config.headers["Authorization"] && token) {
            config.headers["Authorization"] = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(error)
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestIntercept);
      axiosInstance.interceptors.response.eject(responseIntercept);
    };
  }, [token, axiosInstance]);

  return axiosInstance;
};

export default usePrivateAxios;

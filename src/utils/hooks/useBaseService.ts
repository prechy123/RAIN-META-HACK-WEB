import { AxiosError, AxiosInstance } from "axios";
import usePrivateAxios from "./usePrivateAxios";
import { useRouter } from "next/navigation";
import showToast from "@/libs/utils/showToast";
import { toast } from "react-toastify";
interface Params {
  [key: string]: string | number | boolean | undefined | null;
}


export interface IErrorResponse {
  message: string;
}

const useBaseService = (
  subURL: string,
  service: AxiosInstance,
  usePrivate: boolean = true
) => {
  const privateAxios = usePrivateAxios(service);
  const axiosInstance = usePrivate ? privateAxios : service;

  const router = useRouter();

  const constructUrl = (subService: string, params?: Params) => {
    let url = `${subURL}/${subService}`;

    if (params) {
      url += "?";
      for (const key in params) {
        if (
          params[key] !== undefined &&
          params[key] !== "" &&
          params[key] !== null
        ) {
          url += `${key}=${params[key]}&`;
        }
      }
      url = url.slice(0, -1);
    }
    return url;
  };

  const handleExpiredToken = (error: AxiosError<IErrorResponse>) => {
    if (
      error.response?.status === 401 &&
      error.response.data.message === "Unauthorized"
    ) {
      showToast("error", "Please login to continue");
      router.push("/login");
    }
  };

  const get = async <T>(endpoint: string, params?: Params, loading: boolean = true): Promise<T> => {
    try {
      if (loading) showToast("loading", "Please wait...")
      const url = constructUrl(endpoint, params);
      const response = await axiosInstance.get(url);
      toast.dismiss()
      return response.data as T;
    } catch (error) {
      handleExpiredToken(error as AxiosError<IErrorResponse>);
      toast.dismiss()
      if (loading) {

        if (error instanceof AxiosError && error.response?.data?.message) {
          showToast("error", error.response.data.message);
        } else {
          showToast("error", "Try again later");
        }
      }
      return Promise.reject(error);
    }
  };

  const post = async <T, P>(endpoint: string, payload: P): Promise<T> => {
    try {
      showToast("loading", "Please wait...")
      const url = `${subURL}/${endpoint}`;
      const response = await axiosInstance.post(url, payload);
      toast.dismiss()
      return response.data as T;
    } catch (error) {
      handleExpiredToken(error as AxiosError<IErrorResponse>);
      toast.dismiss()
      if (error instanceof AxiosError && error.response?.data?.message) {
        showToast("error", error.response.data.message);
      } else {
        showToast("error", "Try again later");
      }
      return Promise.reject(error);
    }
  };

  const patch = async <T, P>(endpoint: string, payload: P): Promise<T> => {
    try {
      showToast("loading", "Please wait...")
      const url = `${subURL}/${endpoint}`;
      const response = await axiosInstance.patch(url, payload);
      toast.dismiss()
      return response.data as T;
    } catch (error) {
      handleExpiredToken(error as AxiosError<IErrorResponse>);
      toast.dismiss()
      if (error instanceof AxiosError && error.response?.data?.message) {
        showToast("error", error.response.data.message);
      } else {
        showToast("error", "Try again later");
      }
      return Promise.reject(error);
    }
  };

  const put = async <T, P>(endpoint: string, payload: P): Promise<T> => {
    try {
      showToast("loading", "Please wait...")
      const url = `${subURL}/${endpoint}`;
      const response = await axiosInstance.put(url, payload);
      toast.dismiss()
      return response.data as T;
    } catch (error) {
      handleExpiredToken(error as AxiosError<IErrorResponse>);
      toast.dismiss()
      if (error instanceof AxiosError && error.response?.data?.message) {
        showToast("error", error.response.data.message);
      } else {
        showToast("error", "Try again later");
      }
      return Promise.reject(error);
    }
  };

  const del = async <T>(endpoint: string, params?: Params): Promise<T> => {
    try {
      showToast("loading", "Please wait...")
      const url = constructUrl(endpoint, params);
      const response = await axiosInstance.delete(url);
      toast.dismiss()
      return response.data as T;
    } catch (error) {
      handleExpiredToken(error as AxiosError<IErrorResponse>);
      toast.dismiss()
      if (error instanceof AxiosError && error.response?.data?.message) {
        showToast("error", error.response.data.message);
      } else {
        showToast("error", "Try again later");
      }
      return Promise.reject(error);
    }
  };

  return { get, post, patch, put, del, constructUrl };
};

export default useBaseService;

import axios from "axios";

export const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL

export const axiosInstance = axios.create({
    baseURL,
  });
  
  export const createService = (subPath = "") => {
    return axios.create({
      baseURL: `${baseURL}${subPath}`,
    });
  };
  
  export const baseService = createService();
  export const authService = createService("auth");
  export const businessService = createService("business");
  export const chatService = createService("chatbot");
  export const webHookService = createService("web-hook");
  
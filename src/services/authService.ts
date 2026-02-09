import { businessService, chatService, webHookService } from "../utils/api/axios";
import useBaseService from "../utils/hooks/useBaseService";

export interface RegisterBody {
  email: string;
  password: string;
  business_id: string;
  businessName: string;
  businessDescription: string;
  businessAddress: string;
  businessPhone: string;
  businessEmailAddress: string;
  businessCategory: string;
  businessOpenHours: string;
  businessOpenDays: string;
  businessWebsite: string;
  businessPicture: string;
  extra_information: string;
  faqs: FAQ[];
  items: Item[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Item {
  name: string;
  price: number;
  description?: string;
}

export interface RegisterResponse {
  message: string;
  business: Business;
}

export interface Business {
  id: string;
  business_id: string;
  email: string;
  businessName: string;
  businessDescription: string;
  businessAddress: string;
  businessPhone: string;
  businessEmailAddress: string;
  businessCategory: string;
  businessOpenHours: string;
  businessOpenDays: string;
  businessWebsite: string;
  businessPicture: string;
  extra_information: string;
  faqs: FAQ[];
  items: Item[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface LoginResponse {
  message: string;
  business: Business;
}

export interface Business {
  id: string;
  business_id: string;
  email: string;
  businessName: string;
  businessDescription: string;
  businessAddress: string;
  businessPhone: string;
  businessEmailAddress: string;
  businessCategory: string;
  businessOpenHours: string;
  businessOpenDays: string;
  businessWebsite: string;
  businessPicture: string;
  extra_information: string;
  faqs: FAQ[];
  items: Item[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface GetAllBusinessesResponse {
  businesses: {
    business_id: string;
    name: string;
    description: string;
  }[];
  count: number;
}

export const useAuthService = () => {
  const { post, get, put } = useBaseService("", businessService, true);
  const { post: chatPost} = useBaseService(
    "",
    chatService,
    false,
  );
  const { get: webHookGet } = useBaseService("", webHookService, false);

  const register = async (body: RegisterBody): Promise<RegisterResponse> => {
    return await post<RegisterResponse, RegisterBody>("signup", body);
  };

  const login = async (body: {
    email: string;
    password: string;
  }): Promise<LoginResponse> => {
    return await post<LoginResponse, undefined>(
      `login?email=${body.email}&password=${body.password}`,
      undefined,
    );
  };

  const getBusinessDetails = async (business_id: string): Promise<Business> => {
    return await get<Business>(`${business_id}`);
  };

  const updateBusinessDetails = async (
    business_id: string,
    body: Partial<Business>,
  ): Promise<{
    message: string;
    business: Business;
  }> => {
    return await put<
      {
        message: string;
        business: Business;
      },
      Partial<Business>
    >(`${business_id}`, body);
  };

  const webChat = async (
    message: string,
    session_id: string,
  ): Promise<{
    answer: string;
    state: string;
    business_name: string | null;
    business_description: string | null;
    session_reset: boolean;
  }> => {
    return await chatPost("web-chat", {
      message,
      session_id,
    });
  };

  const getAllBusinesses = async (): Promise<GetAllBusinessesResponse> => {
    return await webHookGet<GetAllBusinessesResponse>("get-all-business");
  };

  return {
    register,
    login,
    getBusinessDetails,
    updateBusinessDetails,
    webChat,
    getAllBusinesses,
  };
};

import { SIMPLE_API } from "../../../shared/api/client.ts";
import { LoginFormData, LoginResponse } from "../form/config.ts";
import { AxiosResponse } from "axios";

const loginApi = (data: LoginFormData) => {
  return SIMPLE_API.request<
    unknown,
    AxiosResponse<LoginResponse>,
    LoginFormData
  >({
    method: "POST",
    url: "auth/sign-in",
    data,
  });
};

export default loginApi;

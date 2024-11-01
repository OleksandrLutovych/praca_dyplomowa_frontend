import {API} from "../../../shared/api";
import {LoginFormData, LoginResponse} from "../form/config.ts";
import {AxiosResponse} from "axios";

const loginApi = (data: LoginFormData) => {
    return API.request<unknown, AxiosResponse<LoginResponse>, LoginFormData>({
        method: 'POST',
        url: 'auth/sign-in',
        data,
    });
};

export default loginApi
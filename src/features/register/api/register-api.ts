import {InitialRegisterFormData} from '../forms/RegisterForm/config.ts';
import {API} from '../../../shared/api';
import {DoctorRegisterFormData} from "../forms/DoctorRegisterForm/config.ts";

const registerApi = (data: InitialRegisterFormData) => {
    return API.request({
        method: 'POST',
        url: 'auth/sign-up',
        data,
    });
};

const doctorRegisterApi = (data: DoctorRegisterFormData) => {
    return API.request({
        method: 'POST',
        url: 'auth/doctor-sign-up',
        data,
    });
}

export {registerApi, doctorRegisterApi};
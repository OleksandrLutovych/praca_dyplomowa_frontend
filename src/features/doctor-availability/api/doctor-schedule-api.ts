import { API } from "../../../shared/api";
import { DefaultAvailabilityFormData } from "../forms/DefaultAvailabilityForm/config";
import { DoctorAvailability } from "../utils/types";

const create = async (data: DefaultAvailabilityFormData) => {
  return API.request({
    method: "POST",
    url: "/doctor-schedule",
    data,
  });
};

const get = async () => {
  return API.request<DoctorAvailability[]>({
    method: "GET",
    url: "/doctor-schedule",
  });
};

export const DoctorScheduleApi = {
  create,
  get,
};

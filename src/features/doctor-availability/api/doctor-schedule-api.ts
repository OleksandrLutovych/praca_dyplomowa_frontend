import { API } from "../../../shared/api";
import { DefaultAvailabilityFormData } from "../forms/DefaultAvailabilityForm/config";
import { DoctorAvailability } from "../utils/types";

const get = async () => {
  return API.request<DoctorAvailability[]>({
    method: "GET",
    url: "/doctor-schedule",
  });
};

const getForRange = async (start: Date, end: Date) => {
  return API.request<DoctorAvailability[]>({
    method: "GET",
    url: `/doctor-schedule?start=${start.toISOString()}&end=${end.toISOString()}`,
  });
};

const create = async (data: DefaultAvailabilityFormData) => {
  return API.request({
    method: "POST",
    url: "/doctor-schedule",
    data,
  });
};

const update = async (id: number, data: DefaultAvailabilityFormData) => {
  return API.request({
    method: "PATCH",
    url: `/doctor-schedule/${id}`,
    data,
  });
};

export const DoctorScheduleApi = {
  create,
  get,
  update,
  getForRange,
};

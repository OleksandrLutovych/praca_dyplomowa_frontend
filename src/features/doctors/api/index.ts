import { AxiosResponse } from "axios";
import { API } from "../../../shared/api";
import { Doctor } from "../../../entities/doctor/types";
import { UniversalListResponse } from "../../../shared/types/api-types";
import { DoctorService } from "../../../entities/doctor-service/types";

const getMany = () => {
  return API.request<AxiosResponse<UniversalListResponse<Doctor>>>({
    method: "GET",
    url: "/doctors",
    params: {},
  });
};
const getOne = async ({ id }: { id: number }) => {
  return API.request<AxiosResponse<Doctor>>({
    method: "GET",
    url: `/doctors/${id}`,
    params: {},
  });
};

const getServices = async ({ id }: { id: number }) => {
  return API.request<AxiosResponse<DoctorService>>({
    method: "GET",
    url: `/doctors/${id}/services`,
    params: {},
  });
};
const DoctorsApi = {
  getMany,
  getOne,
  getServices,
};

export { DoctorsApi };

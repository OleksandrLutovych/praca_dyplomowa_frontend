import { AxiosResponse } from "axios";
import { API } from "../../../shared/api";
import { Doctor } from "../../../entities/doctor/types";
import { UniversalListResponse } from "../../../shared/types/api-types";
import { DoctorService } from "../../../entities/doctor-service/types";
import { ListRequest } from "../../../shared/api/types";

const getMany = ({
  signal,
  pagination: { page, perPage },
  filters,
}: ListRequest) => {
  return API.request<UniversalListResponse<Doctor>>({
    method: "GET",
    url: "/doctors",
    params: {
      page,
      perPage,
      ...filters,
    },
    signal,
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

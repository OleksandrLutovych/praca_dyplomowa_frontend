import { AxiosResponse } from "axios";
import { API } from "../../../shared/api";
import { DoctorProfileData } from "../utils/types";

const getData = (): Promise<AxiosResponse<DoctorProfileData>> => {
  return API.request({
    method: "GET",
    url: "/doctor-profile",
  });
};

const DoctorProfileApi = {
  getData,
};

export default DoctorProfileApi;

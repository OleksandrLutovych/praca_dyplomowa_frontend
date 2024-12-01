import { GenericAbortSignal } from "axios";
import { API } from "../../../shared/api";
import { DoctorServiceFormData } from "../forms/DoctorServicesForm";

const create = async (
  data: DoctorServiceFormData,
) => {
  return API.request({
    method: "POST",
    url: "/doctor-services",
    data,
  });
};

const DoctorServiceApi = {
  create,
};

export default DoctorServiceApi;

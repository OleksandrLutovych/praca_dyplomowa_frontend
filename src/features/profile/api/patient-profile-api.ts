import { API } from "../../../shared/api";

const getData = () => {
  return API.request({
    method: "GET",
    url: "/patient-profile",
  });
};

const PatientProfileApi = {
  getData,
};

export default PatientProfileApi;

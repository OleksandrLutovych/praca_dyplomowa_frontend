import { API } from "../../../shared/api";

const activateDoctorApi = ({ id }: { id?: number }) => {
  return API.request({
    method: "GET",
    url: `auth/activate-doctor/${id}`,
  });
};

export default activateDoctorApi;

import { API } from "../../../shared/api";
import { DoctorActivateFormData } from "../../register/forms";

const baseUrl = "auth/activate-doctor";

const activate = ({
  id,
  data,
}: {
  id?: number;
  data: DoctorActivateFormData;
}) => {
  return API.request({
    method: "POST",
    url: `${baseUrl}/${id}`,
    data,
  });
};

const getDoctorUser = ({ id, signal }: { id: number; signal: AbortSignal }) => {
  return API.request({
    url: `${baseUrl}/${id}`,
    method: "GET",
    signal,
  });
};

const ActivateDoctorApi = {
  activate,
  getDoctorUser
};

export default ActivateDoctorApi;

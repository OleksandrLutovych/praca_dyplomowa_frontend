import { API } from "../../../shared/api";
import { PatientActivateFormData } from "../../register/forms/PatientActivateForm/config";

const activatePatientApi = ({
  id,
  data,
}: {
  id?: number;
  data: PatientActivateFormData;
}) => {
  return API.request({
    method: "POST",
    url: `auth/activate-patient/${id}`,
    data,
  });
};

export default activatePatientApi;

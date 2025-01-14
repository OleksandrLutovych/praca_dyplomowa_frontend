import { API } from "../../../shared/api";

type QueryProps = {
  signal: AbortSignal;
};

const getAll = async ({ signal }: QueryProps) => {
  return API.request({
    method: "GET",
    url: "/patient-personal-visits",
    signal,
  });
};

const PatientPersonalVisitsApi = {
  getAll,
};

export { PatientPersonalVisitsApi };

import { API } from "../../../shared/api";
import { LeaveFeedbackFormData } from "../forms/LeaveFeedbackForm";

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

const getById = async ({ id, signal }: { id: number; signal: AbortSignal }) => {
  return API.request({
    method: "GET",
    url: `/patient-personal-visits/${id}`,
    signal,
  });
};

const aprove = async ({ id }: { id: number }) => {
  return API.request({
    method: "POST",
    url: `/patient-personal-visits/${id}/approve`,
  });
};

const cancel = async ({ id }: { id: number }) => {
  return API.request({
    method: "POST",
    url: `/patient-personal-visits/${id}/cancel`,
  });
};

const feedback = async ({
  id,
  data,
}: {
  id: number;
  data: LeaveFeedbackFormData;
}) => {
  return API.request({
    method: "POST",
    url: `/patient-personal-visits/${id}/feedback`,
    data,
  });
};

const PatientPersonalVisitsApi = {
  getAll,
  getById,
  aprove,
  cancel,
  feedback,
};

export { PatientPersonalVisitsApi };

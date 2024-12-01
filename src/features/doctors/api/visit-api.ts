import { Visit } from "../../../pages/doctors/utils/types";
import { API } from "../../../shared/api";
import { CreateAppointmentFormData } from "../forms";

const create = async ({
  id,
  value,
}: {
  id: number;
  value: CreateAppointmentFormData;
}) => {
  return API.request<Visit>({
    method: "POST",
    url: `/doctors/${id}/visits`,
    data: value,
  });
};

const available = async ({ id }: { id: number }) => {
  return API.request({
    method: "GET",
    url: `/doctors/${id}/available-times`,
  });
};

const VisitApi = {
  create,
  available,
};

export { VisitApi };

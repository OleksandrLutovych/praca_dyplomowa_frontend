import { API } from "../../../shared/api";
import { CreateAppointmentFormData } from "../forms";

const create = async ({
  id,
  value,
}: {
  id: number;
  value: CreateAppointmentFormData;
}) => {
  return API.request({
    method: "POST",
    url: `/doctors/${id}/visits`,
    data: value,
  });
};

const VisitApi = {
  create,
};

export { VisitApi };

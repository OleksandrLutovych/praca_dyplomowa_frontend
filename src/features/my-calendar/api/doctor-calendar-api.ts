import { API } from "../../../shared/api";
import { DoctorCalendarEventsDto } from "../utils/types";

const getMany = () => {
  return API.request<DoctorCalendarEventsDto>({
    method: "GET",
    url: "/doctor-calendar",
  });
};

const DoctorCalendarApi = {
  getMany,
};

export default DoctorCalendarApi;

import { GenericAbortSignal } from "axios";
import { API } from "../../../shared/api";
import { Consult } from "../utils/types";
import {
  CalendarEvent,
  DoctorCalendarEventsDto,
} from "../../my-calendar/utils/types";

const get = ({ signal, id }: { signal: GenericAbortSignal; id: number }) => {
  return API.request<Consult>({
    method: "GET",
    url: `/doctor-consults/${id}`,
    signal,
  });
};

const getUpcoming = ({ signal }: { signal: GenericAbortSignal }) => {
  return API.request<DoctorCalendarEventsDto>({
    method: "GET",
    url: "/doctor-upcoming-consults",
    signal,
  });
};

const DoctorConsultsApi = {
  get,
  getUpcoming,
};

export default DoctorConsultsApi;

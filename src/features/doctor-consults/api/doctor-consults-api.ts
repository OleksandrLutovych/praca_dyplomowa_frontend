import { GenericAbortSignal } from "axios";
import { API } from "../../../shared/api";
import { Consult } from "../utils/types";
import {
  CalendarEvent,
  DoctorCalendarEventsDto,
} from "../../my-calendar/utils/types";
import { FinishConsultFormData } from "../forms/FinishConsultForm";

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

const recomendations = ({
  id,
  data,
}: {
  id: number;
  data: FinishConsultFormData;
}) => {
  return API.request({
    method: "POST",
    url: `/doctor-consults/${id}/recomendations`,
    data,
  });
};

const finish = ({ id }: { id: number }) => {
  return API.request({
    method: "PATCH",
    url: `/doctor-consults/${id}/finish`,
  });
};

const DoctorConsultsApi = {
  get,
  getUpcoming,
  recomendations,
  finish,
};

export default DoctorConsultsApi;

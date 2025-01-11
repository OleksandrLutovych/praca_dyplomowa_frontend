import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { BackendError } from "../../../shared/types/api-types";
import { CalendarEvent } from "../../my-calendar/utils/types";
import { DoctorScheduleApi } from "../api/doctor-schedule-api";

const useDoctorDefaultSchedule = () => {
  const query = useQuery<unknown, AxiosError<BackendError>, CalendarEvent[]>({
    queryKey: ["doctor-schedule"],
    queryFn: async () => {
      const { data } = await DoctorScheduleApi.get();

      const response: CalendarEvent[] =
        data.map((event) => ({
          id: event.id,
          title: "Praca",
          start: new Date(event.start),
          end: new Date(event.end),
        })) || [];

      return response;
    },
  });

  return query;
};

export default useDoctorDefaultSchedule;

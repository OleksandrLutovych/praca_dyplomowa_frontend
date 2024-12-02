import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { BackendError } from "../../../shared/types/api-types";
import { DoctorConsultsApi } from "../../doctor-consults/api";
import { CalendarEvent } from "./types";
import { addHours } from "date-fns";

export const useUpcomingVisits = () => {
  const query = useQuery<unknown, AxiosError<BackendError>, CalendarEvent[]>({
    queryKey: ["upcomingVisits"],
    queryFn: async ({ signal }) => {
      const { data } = await DoctorConsultsApi.getUpcoming({ signal });
      const { events } = data;

      const response: CalendarEvent[] =
        events.map((event) => ({
          id: event.id,
          title: event.title,
          start: event.start,
          end: addHours(event.end, 1),
        })) || [];
      console.log(response);
      return response;
    },
  });

  return query;
};

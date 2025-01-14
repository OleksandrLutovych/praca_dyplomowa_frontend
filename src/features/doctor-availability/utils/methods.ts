import { CalendarEvent } from "../../my-calendar/utils/types";
import { DefaultAvailabilityFormData } from "../forms/DefaultAvailabilityForm/config";
import { DoctorAvailability } from "./types";

export const mapScheduleDataToEntities = (
  data: DoctorAvailability[]
): DefaultAvailabilityFormData => {
  const calendarData: CalendarEvent[] =
    data?.map((event) => ({
      id: event.id,
      title: "Praca",
      start: new Date(event.start),
      end: new Date(event.end),
    })) || [];

  return {
    durationInMinutes: data[0].duration,
    schedule: calendarData,
  };
};

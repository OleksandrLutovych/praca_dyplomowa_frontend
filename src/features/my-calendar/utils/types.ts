import { Event } from "react-big-calendar";
import { VisitStatus } from "../../../entities/visits/enums";

interface CalendarEvent extends Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  status: VisitStatus;
}
type DoctorCalendarEventsDto = {
  events: CalendarEvent[];
};

export type { CalendarEvent, DoctorCalendarEventsDto };

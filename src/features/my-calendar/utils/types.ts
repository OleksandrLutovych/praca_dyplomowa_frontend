import { Event } from "react-big-calendar";

interface CalendarEvent extends Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
}
type DoctorCalendarEventsDto = {
  events: CalendarEvent[];
};

export type { CalendarEvent, DoctorCalendarEventsDto };

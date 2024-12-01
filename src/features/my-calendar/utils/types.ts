type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
};
type DoctorCalendarEventsDto = {
  events: CalendarEvent[];
};

export type { CalendarEvent, DoctorCalendarEventsDto };

import { useQuery } from '@tanstack/react-query';
import moment from 'moment'
import { Calendar, Event, momentLocalizer } from 'react-big-calendar'
import { DoctorCalendarApi } from '../../api';
import { AxiosError } from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment-timezone'
import { addHours } from 'date-fns';
import "moment/locale/pl";

moment.tz.setDefault('Europe/Paris')
moment.locale("pl");
const localizer = momentLocalizer(moment)

const CalendarPage = () => {

  const { data, isLoading, error, isError } = useQuery<unknown, AxiosError, Event[]>({
    queryKey: ['doctor-calendar'],
    queryFn: async () => {
      const { data } = await DoctorCalendarApi.getMany()
      const { events } = data;

      const response: Event[] = events.map(event => ({
        title: event.title,
        start: event.start,
        end: addHours(event.end, 1)
      })) || []

      return response
    }
  })




  return (
    <Calendar
      localizer={localizer}
      culture='pl'
      events={data}
      startAccessor={(event) => { return new Date(event.start ?? '') }}
      endAccessor={(event) => { return new Date(event.end ?? '') }}
      onDoubleClickEvent={(event) => { console.log(event) }}
      style={{ height: 800 }}
    />
  );
};

export default CalendarPage;
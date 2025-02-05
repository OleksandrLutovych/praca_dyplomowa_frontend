import { Box, Card, Divider, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { addHours } from 'date-fns';
import moment from 'moment';
import 'moment-timezone';
import "moment/locale/pl";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { BackendError } from '../../../../shared/types/api-types';
import { ApiError, Breadcrumbs, Loader } from '../../../../shared/ui';
import { DoctorCalendarApi } from '../../api';
import { useNavigate } from 'react-router-dom';
import { CalendarEvent } from '../../utils/types';
import { CalendarLegend, UpcomingVisits } from '../../components';
import { VisitStatus } from '../../../../entities/visits/enums';

moment.tz.setDefault('Europe/Paris')
moment.locale("pl");

const breadcrumbItems = [
  { label: "Dashboard", to: "/dashboard", isCurrentPage: false },
  { label: "Moje wizyty", to: "/dashboard/calendar", isCurrentPage: true },
]


const localizer = momentLocalizer(moment)

const CalendarPage = () => {

  const navigate = useNavigate()

  const { data, isLoading, error, isError } = useQuery<unknown, AxiosError<BackendError>, CalendarEvent[]>({
    queryKey: ['doctor-calendar'],
    queryFn: async () => {
      const { data } = await DoctorCalendarApi.getMany()
      const { events } = data;

      const response: CalendarEvent[] = events.map(event => ({
        id: event.id,
        title: event.title,
        start: event.start,
        end: addHours(event.end, 1),
        status: event.status,
      })) || []

      return response
    }
  })

  const handleEventClick = (id: number) => {
    navigate(`/dashboard/consults/${id}`)
  }

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <ApiError error={error} isError={isError} />
      <Loader isLoading={isLoading} />


      <Stack direction={'row'} gap={2}>
        <Card sx={{
          height: 700, width: '75%', padding: 2
        }}>
          <CalendarLegend />
          <Calendar<CalendarEvent>
            localizer={localizer}
            culture='pl'
            events={data}
            startAccessor={(event) => { return new Date(event.start ?? '') }}
            endAccessor={(event) => { return new Date(event.end ?? '') }}
            onDoubleClickEvent={(event) => handleEventClick(event.id)}
            onRangeChange={(range) => console.log(range)}
            eventPropGetter={(event) => {
              let backgroundColor = ''
              let textColor = ''
              switch (event.status) {
                case VisitStatus.ACCEPTED:
                  backgroundColor = 'green'
                  textColor = 'white'
                  break
                case VisitStatus.CANCELED:
                  backgroundColor = 'red'
                  textColor = 'white'
                  break
                case VisitStatus.FINISHED:
                  backgroundColor = 'blue'
                  textColor = 'white'
                  break
                default:
                  backgroundColor = 'gray'
                  textColor = 'white'
                  break
              }
              return {
                style: {
                  backgroundColor,
                  color: textColor
                }
              }
            }}

          />
        </Card>

        <Card
          sx={{
            height: 700, width: '25%', padding: 2, overflowY: 'scroll', position: "relative"
          }}>
          <Box position={"sticky"} top={0} left={0} bgcolor={"white"}>
            <Typography variant="h6" textAlign="center">Nadchodzące wizyty</Typography>
            <Divider />
          </Box>
          <UpcomingVisits />
        </Card>
      </Stack>

    </>

  );
};

export default CalendarPage;
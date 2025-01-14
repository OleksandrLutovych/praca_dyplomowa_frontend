import { Button, Card, Divider, Stack } from "@mui/material";
import { useMemo, useState } from "react";
import { Calendar } from "react-big-calendar";
import { MdDashboardCustomize, MdModeEditOutline, MdOutlineAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ApiError, Breadcrumbs, Loader } from "../../../shared/ui";
import { localizer } from "../../../shared/utils/date-fns-localizer";
import { CalendarEvent } from "../../my-calendar/utils/types";
import { useDoctorSchedule } from "../hooks";
import { endOfMonth, startOfMonth } from "date-fns";

const breadcrumbItems = [
  { label: "Dashboard", to: "/dashboard", isCurrentPage: false },
  { label: "Czas pracy", to: "/dashboard/availability", isCurrentPage: true },
]

const DoctorAvailabilityPage = () => {

  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState<{ start: Date, end: Date }>({ start: startOfMonth(new Date()), end: endOfMonth(new Date()) });

  const { data, error, isError, isLoading } = useDoctorSchedule(dateRange.start, dateRange.end);

  const calendarData: CalendarEvent[] = useMemo(() =>
    data?.map((event) => ({
      id: event.id,
      title: "Praca",
      start: new Date(event.start),
      end: new Date(event.end),
    })) || [], [data]);

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <ApiError error={error} isError={isError} />
      <Loader isLoading={isLoading} />

      <Stack direction={'row'} gap={2} justifyContent={'flex-end'} alignItems={'center'}>
        <Button onClick={() => navigate('/dashboard/availability/add')} variant="contained" startIcon={calendarData.length ? <MdModeEditOutline /> : <MdOutlineAdd />}>{calendarData.length ? 'Edytuj grafik' : 'Utwórz nowy grafik'}</Button>
        <Button onClick={() => navigate('/dashboard/availability/add-custom')} variant="contained" startIcon={<MdDashboardCustomize />}>Zaplanuj inne dni pracy</Button>
      </Stack>

      <Divider sx={{ marginY: 2 }} />

      <Card sx={{ padding: 1, marginTop: 2 }}>
        <Calendar<CalendarEvent>
          localizer={localizer}
          culture="pl"
          events={calendarData}
          style={{ height: '70vh', width: "100%", padding: 3 }}
          formats={{
            dayFormat: (date, culture, localizer) =>
              localizer?.format(date, "EEEE", culture) ?? "",
            timeGutterFormat: (date, culture, localizer) =>
              localizer?.format(date, "HH:mm", culture) ?? "",
          }}

          onRangeChange={(range) => console.log(range)}
        />
      </Card>

    </>
  );
};

export default DoctorAvailabilityPage;
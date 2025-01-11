import { Button, Card, Stack } from "@mui/material";
import { Calendar } from "react-big-calendar";
import { MdDashboardCustomize, MdModeEditOutline, MdOutlineAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ApiError, Breadcrumbs, Loader } from "../../../shared/ui";
import { localizer } from "../../../shared/utils/date-fns-localizer";
import { CalendarEvent } from "../../my-calendar/utils/types";
import { useDoctorDefaultSchedule } from "../hooks";

const breadcrumbItems = [
  { label: "Dashboard", to: "/dashboard", isCurrentPage: false },
  { label: "Czas pracy", to: "/dashboard/availability", isCurrentPage: true },
]

const DoctorAvailabilityPage = () => {

  const navigate = useNavigate();

  const { data, error, isError, isLoading } = useDoctorDefaultSchedule();

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <ApiError error={error} isError={isError} />
      <Loader isLoading={isLoading} />

      <Stack direction={'row'} gap={2} justifyContent={'space-between'}>
        <Button onClick={() => navigate('/dashboard/availability/add')} variant="outlined" startIcon={<MdOutlineAdd />}>Utwórz nowy grafik</Button>
        <Button onClick={() => navigate('/dashboard/availability/edit')} variant="outlined" startIcon={<MdModeEditOutline />}>Edytuj istniejący grafik</Button>
        <Button onClick={() => navigate('/dashboard/availability/add-custom')} variant="outlined" startIcon={<MdDashboardCustomize />}>Zaplanuj inne dni pracy</Button>
      </Stack>

      <Card sx={{ padding: 1, marginTop: 2 }}>
        <Calendar<CalendarEvent>
          localizer={localizer}
          culture="pl"
          view="week"
          events={data ?? []}
          style={{ height: '70vh', width: "100%", padding: 3 }}
          toolbar={false}
          formats={{
            dayFormat: (date, culture, localizer) =>
              localizer?.format(date, "EEEE", culture) ?? "",
            timeGutterFormat: (date, culture, localizer) =>
              localizer?.format(date, "HH:mm", culture) ?? "",
          }}
        />
      </Card>

    </>
  );
};

export default DoctorAvailabilityPage;
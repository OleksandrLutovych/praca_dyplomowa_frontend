import { Alert } from '@mui/material';
import { ApiError, Breadcrumbs, Loader } from '../../../shared/ui';
import { ScheduleCalendar } from '../components';
import { DefaultAvailabilityFormData } from '../forms/DefaultAvailabilityForm/config';
import { useDoctorDefaultSchedule } from '../hooks';
import { useCreateDoctorDefaultSchedule } from '../hooks/mutations';

const breadcrumbItems = [
  { label: "Dashboard", to: "/dashboard", isCurrentPage: false },
  { label: "Czas pracy", to: "/dashboard/availability" },
  { label: "Planowanie domyślnego grafiku", to: "/dashboard/add", isCurrentPage: true },
]

const DoctorAvailabilityCreatePage = () => {

  const { data: doctorScheduleData, isLoading, isSuccess: isDoctorScheduleDataSuccess } = useDoctorDefaultSchedule();
  const { mutate, error, isError, isPending, isSuccess } = useCreateDoctorDefaultSchedule();

  const handleFormSubmit = (values: DefaultAvailabilityFormData) => {
    return mutate(values)
  };

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />

      <ApiError error={error} isError={isError} />
      <Loader isLoading={isPending || isLoading} />
      {isSuccess && <Alert severity="success">This is a success Alert.</Alert>}

      <ScheduleCalendar />
    </>
  );
};

export default DoctorAvailabilityCreatePage;
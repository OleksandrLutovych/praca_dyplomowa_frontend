import { Alert, Button, Stack, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IoWarningOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '../../../shared/hooks';
import { BackendError } from '../../../shared/types/api-types';
import { ApiError, Breadcrumbs, Loader } from '../../../shared/ui';
import Modal from '../../../shared/ui/Modal';
import { DoctorScheduleApi } from '../api/doctor-schedule-api';
import { DefaultAvailabilityForm } from '../forms';
import { DefaultAvailabilityFormData } from '../forms/DefaultAvailabilityForm/config';
import { useDoctorDefaultSchedule } from '../hooks';

const breadcrumbItems = [
  { label: "Dashboard", to: "/dashboard", isCurrentPage: false },
  { label: "Czas pracy", to: "/dashboard/availability" },
  { label: "Planowanie domyślnego grafiku", to: "/dashboard/add", isCurrentPage: true },
]

const DoctorAvailabilityCreatePage = () => {

  const { isOpen, onClose } = useDisclosure(true);
  const navigate = useNavigate();

  const { data: doctorScheduleData, isLoading, isSuccess: isDoctorScheduleDataSuccess } = useDoctorDefaultSchedule();

  const queryClient = useQueryClient();
  const { data, mutate, error, isError, isPending, isSuccess } = useMutation<unknown, AxiosError<BackendError>, DefaultAvailabilityFormData>({
    mutationKey: ['create-doctor-availability'],
    mutationFn: async (data) => {
      const response = await DoctorScheduleApi.create(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctor-schedule'] });
    }
  })

  const handleFormSubmit = (values: DefaultAvailabilityFormData) => {
    return mutate(values)
  };


  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />

      <ApiError error={error} isError={isError} />
      <Loader isLoading={isPending || isLoading} />
      {isSuccess && <Alert severity="success">This is a success Alert.</Alert>}

      <DefaultAvailabilityForm handleFormSubmit={handleFormSubmit} />

      {doctorScheduleData && isDoctorScheduleDataSuccess && <Modal handleClose={onClose} open={doctorScheduleData.length > 0 && isOpen}>
        <Stack direction={'column'} gap={3} justifyContent={'space-between'} alignItems={'center'} sx={{ padding: 2 }}>
          <IoWarningOutline size={60} color='orange' />
          <Typography variant={'h6'}>Uwaga!</Typography>
          <Typography textAlign={'center'}>
            Posiadasz już zapisany domyślny grafik na {doctorScheduleData.length} dni. Przy utworzeniu nowego grafiku, poprzedni zostanie nadpisany.
          </Typography>
          <Typography variant={'h6'}>Czy chcesz kontynować?</Typography>
          <Stack direction={'row'} gap={2}>
            <Button onClick={() => navigate('/dashboard/availability')} variant="outlined">Anuluj</Button>
            <Button onClick={onClose} variant="contained">Kontynuuj</Button>
            <Button onClick={() => navigate('/dashboard/availability/edit')} variant="contained" color='warning'>Edycja</Button>
          </Stack>
        </Stack>
      </Modal>}
    </>
  );
};

export default DoctorAvailabilityCreatePage;
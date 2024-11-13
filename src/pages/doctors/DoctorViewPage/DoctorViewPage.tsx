import { useParams } from "react-router-dom";
import { useDoctor } from "../../../features/doctors/hooks/useDoctor";
import Calendar from 'react-calendar';
import { useState } from "react";
import { Box, Button, Container, Divider, FormControl, InputLabel, MenuItem, Paper, Select, Stack, Typography } from "@mui/material";
import { CreateAppointmentForm, CreateAppointmentFormData } from "../../../features/doctors/forms";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const DoctorViewPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useDoctor({ id: Number(id) });
  const [value, onChange] = useState<Value>(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedProcedure, setSelectedProcedure] = useState('');
  const procedures = ['Консультация', 'УЗИ', 'МРТ', 'Лечение'];

  // const {
  //   mutate,
  //   error,
  //   isError,
  //   isSuccess,
  //   isPending,
  // } = useMutation<unknown, AxiosError, InitialRegisterFormData>({
  //   mutationKey: ['register'],
  //   mutationFn: (data) => registerApi(data),
  //   onSuccess: () => {
  //     setTimeout(() => {
  //       setNextPageLoading(false);
  //       navigate('/login');
  //     }, 4000);
  //   },
  // });


  const handleFormSubmit = (values: CreateAppointmentFormData) => {
    console.log(values)
  };

  return (
    <Container maxWidth="xl">
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center" justifyContent={'space-between'}>
          <Stack sx={{ width: '50%' }}>
            <Typography variant="h5">Dr. {" "}
              {data?.user.firstName} {data?.user.lastName}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Специалист по кардиологии с более чем 20-летним опытом. Доктор Иванов
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Часы приема: Понедельник - Пятница, с 9:00 до 18:00
            </Typography>
          </Stack>
          <Divider />
          <Stack sx={{ width: '50%' }}>

            <Typography variant="h6">Umów się na wizytę</Typography>
            <CreateAppointmentForm handleFormSubmit={handleFormSubmit} />
          </Stack>

        </Stack>
      </Paper>
    </Container>
  )

};

export default DoctorViewPage;

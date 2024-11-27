import { useParams } from "react-router-dom";
import { useDoctor } from "../../../../features/doctors/hooks/useDoctor";
import Calendar from 'react-calendar';
import { useState } from "react";
import { Box, Button, Container, Divider, FormControl, InputLabel, MenuItem, Paper, Select, Stack, Typography } from "@mui/material";
import { CreateAppointmentForm, CreateAppointmentFormData } from "../../../../features/doctors/forms";
import { VisitApi } from "../../../../features/doctors/api/visit-api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const DoctorViewPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useDoctor({ id: Number(id) });
  const [value, onChange] = useState<Value>(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedProcedure, setSelectedProcedure] = useState('');

  const {
    mutate,
    error,
    isError,
    isSuccess,
    isPending,
  } = useMutation<unknown, AxiosError, CreateAppointmentFormData>({
    mutationKey: ['visit', id],
    mutationFn: (data) => VisitApi.create({ id: Number(id), value: data }),
  });


  const handleFormSubmit = (values: CreateAppointmentFormData) => {
    return mutate(values);
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
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
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

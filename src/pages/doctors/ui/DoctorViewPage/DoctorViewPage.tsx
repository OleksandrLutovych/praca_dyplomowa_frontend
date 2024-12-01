import { Container, Divider, Paper, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDoctor } from "../../../../features/doctors/hooks/useDoctor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { VisitApi } from "../../../../features/doctors/api/visit-api";
import { AfterCreateVisitCard } from "../../components";
import { Visit } from "../../utils/types";
import { CreateAppointmentForm, CreateAppointmentFormData } from "../../../../features/doctors/forms";

const DoctorViewPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useDoctor({ id: Number(id) });

  const queryClient = useQueryClient();
  const {
    mutate,
    error,
    isError,
    isSuccess,
    isPending,
    data: visitData,
  } = useMutation<AxiosResponse<Visit>, AxiosError, CreateAppointmentFormData>({
    mutationKey: ['visit', id],
    mutationFn: (data) => VisitApi.create({ id: Number(id), value: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['available-times'] })
    }
  });

  return (
    <Container maxWidth="xl">
      {!isSuccess && <Paper elevation={3} sx={{ padding: 3 }}>
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
            <CreateAppointmentForm mutate={mutate} />
          </Stack>

        </Stack>
      </Paper>}

      {isSuccess && <AfterCreateVisitCard data={visitData.data} />}
    </Container>
  )

};

export default DoctorViewPage;

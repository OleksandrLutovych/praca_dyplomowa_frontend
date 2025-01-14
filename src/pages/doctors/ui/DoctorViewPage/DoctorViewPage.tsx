import { Container, Divider, Paper, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDoctor } from "../../../../features/doctors/hooks/useDoctor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { VisitApi } from "../../../../features/doctors/api/visit-api";
import { AfterCreateVisitCard } from "../../components";
import { Visit } from "../../utils/types";
import { CreateAppointmentForm, CreateAppointmentFormData } from "../../../../features/doctors/forms";
import { ApiError, Breadcrumbs, Loader } from "../../../../shared/ui";
import { BackendError } from "../../../../shared/types/api-types";

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
  } = useMutation<AxiosResponse<Visit>, AxiosError<BackendError>, CreateAppointmentFormData>({
    mutationKey: ['visit', id],
    mutationFn: (data) => VisitApi.create({ id: Number(id), value: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['available-times'] })
    }
  });

  return (
    <Container maxWidth="xl">
      <Breadcrumbs items={[]} />

      <ApiError error={error} isError={isError} />
      <Loader isLoading={isPending || isLoading} />

      {!isSuccess && <Paper elevation={3} sx={{ padding: 3 }}>
        <Stack direction="row" spacing={5} alignItems="center" justifyContent={'space-between'}>
          <Stack sx={{ width: '40%' }}>
            <Typography variant="h5">Dr. {" "}
              {data?.user.firstName} {data?.user.lastName}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {data?.proffesion}
            </Typography>
          </Stack>
          <Divider sx={{ color: "red", height: "600px" }} orientation="vertical" />
          <Stack sx={{ width: '60%' }}>
            <CreateAppointmentForm mutate={mutate} />
          </Stack>

        </Stack>
      </Paper>}

      {isSuccess && <AfterCreateVisitCard data={visitData.data} />}
    </Container>
  )

};

export default DoctorViewPage;

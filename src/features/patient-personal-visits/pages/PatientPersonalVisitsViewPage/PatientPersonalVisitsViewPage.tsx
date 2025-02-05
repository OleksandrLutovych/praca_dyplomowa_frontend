import { Alert, Button, Card, Collapse, Divider, Stack, Typography } from '@mui/material';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { FaUserDoctor } from 'react-icons/fa6';
import { GrMoney } from 'react-icons/gr';
import { MdMergeType } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { ApiError, Breadcrumbs, Loader } from '../../../../shared/ui';
import { usePatientPersonalVisit } from '../../hooks/usePatientPersonalVisit';
import StatusIcon from '../../../../shared/ui/StatusIcon';
import { usePatientApproveVisit } from '../../hooks/usePatientApproveVisit';
import { usePatientCancelVisit } from '../../hooks/usePatientCancelVisit';
import { VisitStatus } from '../../../../entities/visits/enums';
import { LeaveFeedbackForm } from '../../forms';

const breadcrumbsItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Lista wizyt', isCurrentPage: true },
]

const PatientPersonalVisitsViewPage = () => {

  const params = useParams();
  const id = Number(params.id);

  const { data, isError, error, isLoading } = usePatientPersonalVisit(id)
  const { mutate: approveMutate, isPending: isAprovePending, isSuccess: isApproveSuccess } = usePatientApproveVisit(id)
  const { mutate: cancelMutate, isPending: isCancelPending, isSuccess: isCancelSuccess } = usePatientCancelVisit(id)

  return (
    <>
      <Breadcrumbs items={breadcrumbsItems} />
      <ApiError error={error} isError={isError} />
      <Loader isLoading={isLoading || isAprovePending || isCancelPending} />
      {isApproveSuccess && <Collapse in={isApproveSuccess}>
        <Alert
          severity={'success'}
          sx={{ mb: 2 }}
        >
          Wizyta została potwierdzona
        </Alert>
      </Collapse>}

      {isCancelSuccess && <Collapse in={isCancelSuccess} >
        <Alert
          severity={'success'}
          sx={{ mb: 2 }}
        >
          Wizyta została odrzucona
        </Alert>
      </Collapse>}

      <Card sx={{ p: '25px', }}>
        <Stack direction={"row"} alignItems={'center'} gap={5}>
          <StatusIcon status={data?.status} />
          <Typography variant='h5'>Wizyta</Typography>
        </Stack>

        {data && <Stack sx={{ mt: 5 }} gap={3} color='#7E7E7E'>
          <Stack direction={"row"} alignItems={'center'} gap={2}>
            <FaUserDoctor size={25} />
            <Typography variant='body1'>{format(data.date, 'dd MMMM HH:mm', { locale: pl })}</Typography>
          </Stack>
          <Stack direction={"row"} alignItems={'center'} gap={2}>
            <FaUserDoctor size={25} />
            <Typography variant='body1'>{data.doctor.user.firstName} {data.doctor.user.lastName}</Typography>
          </Stack>
          <Stack direction={"row"} alignItems={'center'} gap={2}>
            <MdMergeType size={25} />
            <Typography variant='body1'>{data.type}</Typography>
          </Stack>
          <Stack direction={"row"} alignItems={'center'} gap={2}>
            <GrMoney size={25} />
            <Typography variant='body1'>{data.service.price} zl</Typography>
          </Stack>
          <Stack direction={"row"} alignItems={'center'} gap={2}>
            <GrMoney size={25} />
            <Typography variant='body1'>{data.service.recomendation} zl</Typography>
          </Stack>

        </Stack>}

        <Stack direction={"row"} justifyContent={'flex-start'} sx={{ gap: 5, w: '100%', mt: 5 }}>
          {data?.status === VisitStatus.CREATED && <Button variant='contained' color='success' sx={{ width: '100%' }} onClick={approveMutate}>Potwierdż</Button>}
          {(data?.status !== VisitStatus.FINISHED && data?.status !== VisitStatus.CANCELED) && (
            <Button variant='outlined' color='warning' sx={{ width: '100%' }} onClick={cancelMutate}>
              Odrzuć
            </Button>
          )}
        </Stack>
        <Divider sx={{ my: 5 }} />
        {data?.finishRecomendations && <Stack direction={"column"} alignItems={'center'} gap={2} my={5}>
          <Typography variant='body1' sx={{ opacity: 0.7 }}>Rekomendacje końcowe:</Typography>
          <Typography variant='body1'>{data.finishRecomendations}</Typography>
        </Stack>}

        {data?.status === VisitStatus.FINISHED && !data?.comment && <LeaveFeedbackForm />}

      </Card >
    </>

  );
};

export default PatientPersonalVisitsViewPage;
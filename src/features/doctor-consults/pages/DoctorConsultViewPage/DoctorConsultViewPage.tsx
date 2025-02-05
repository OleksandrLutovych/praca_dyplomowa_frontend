import { useParams } from 'react-router-dom';
import { useConsult } from '../../utils/hooks';
import { ApiError, Breadcrumbs, Loader } from '../../../../shared/ui';
import { ConsultInfoCard } from '../../components';
import { Button, Card } from '@mui/material';
import { VisitStatus } from '../../../../entities/visits/enums';
import { useFinishDoctorConsult } from '../../hooks';
import { FinishConsultForm } from '../../forms';

const breadcrumbItems = [
  { label: "Dashboard", to: "/dashboard", isCurrentPage: false },
  { label: "Kalendarz z wizytami", to: "/dashboard/calendar" },
  { label: "Podgląd wizyty", to: "/dashboard/add", isCurrentPage: true },
]

const DoctorConsultViewPage = () => {

  const params = useParams()
  const { id } = params;
  const parseId = Number(id)

  const { data, error, isLoading, isError } = useConsult({ id: parseId });

  const { mutate, error: finishError, isError: isFinishError, isPending } = useFinishDoctorConsult(parseId);

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <ApiError error={error || finishError} isError={isError || isFinishError} />
      <Loader isLoading={isLoading || isPending} />

      <Card sx={{ p: '25px', mx: 'auto' }}>
        {data && <ConsultInfoCard data={data} />}

        {data?.status !== VisitStatus.FINISHED && <Button variant='contained' onClick={mutate}>Zakończ wizytę</Button>}

        {data?.status === VisitStatus.FINISHED && <FinishConsultForm />}
      </Card>
    </>
  );
};

export default DoctorConsultViewPage;
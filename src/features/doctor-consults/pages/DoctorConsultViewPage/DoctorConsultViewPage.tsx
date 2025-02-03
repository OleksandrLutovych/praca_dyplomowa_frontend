import { useParams } from 'react-router-dom';
import { useConsult } from '../../utils/hooks';
import { ApiError, Breadcrumbs, Loader } from '../../../../shared/ui';
import { ConsultInfoCard } from '../../components';
import { Button, Card } from '@mui/material';
import { VisitStatus } from '../../../../entities/visits/enums';

const DoctorConsultViewPage = () => {

  const params = useParams()
  const { id } = params;
  const parseId = Number(id)

  const { data, error, isLoading, isError } = useConsult({ id: parseId });

  return (
    <>
      <Breadcrumbs items={[]} />
      <ApiError error={error} isError={isError} />
      <Loader isLoading={isLoading} />
      <Card sx={{ p: '25px', mx: 'auto' }}>
        {data && <ConsultInfoCard data={data} />}

        {data?.status !== VisitStatus.CANCELED && <Button variant='contained'>Zakończ wizytę</Button>}
      </Card>
    </>
  );
};

export default DoctorConsultViewPage;
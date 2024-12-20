import { useParams } from 'react-router-dom';
import { useConsult } from '../../utils/hooks';
import { ApiError, Breadcrumbs, Loader } from '../../../../shared/ui';
import { ConsultInfoCard } from '../../components';
import { Button, Card } from '@mui/material';

const DoctorConsultViewPage = () => {

  const params = useParams()
  const { id } = params;
  const parseId = Number(id)

  const { data, error, isLoading, isError } = useConsult({ id: parseId });
  console.log(data)

  return (
    <>
      <Breadcrumbs />
      <ApiError error={error} isError={isError} />
      <Loader isLoading={isLoading} />
      <Card sx={{ p: '25px', mx: 'auto' }}>
        {data && <ConsultInfoCard data={data} />}

        <Button variant='contained'>Zakończ wizytę</Button>
      </Card>
    </>
  );
};

export default DoctorConsultViewPage;
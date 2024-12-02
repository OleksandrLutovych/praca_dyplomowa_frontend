import { CircularProgress, Stack } from '@mui/material';
import { useUpcomingVisits } from '../../utils/hooks';
import { ApiError } from '../../../../shared/ui';
import UpcomingVisitCard from './partial/UpcomingVisitCard';

const UpcomingVisits = () => {

  const { data, isLoading, isError, error } = useUpcomingVisits();
  return (
    <>
      <ApiError error={error} isError={isError} />
      {isLoading && <CircularProgress />}
      <Stack spacing={1} sx={{ mt: 2 }}>
        {data?.map((visit) => (
          <UpcomingVisitCard key={visit.id} data={visit} />
        ))
        }
      </Stack >
    </>
  );
};

export default UpcomingVisits;
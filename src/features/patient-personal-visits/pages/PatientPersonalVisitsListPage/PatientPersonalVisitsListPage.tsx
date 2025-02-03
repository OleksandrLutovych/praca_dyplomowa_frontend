import { ApiError, Breadcrumbs, DataTable, Loader } from '../../../../shared/ui';
import { usePatientPersonalVisits } from '../../hooks/usePatientPersonalVisits';
import { PatientPersonalVisit } from '../../utils/types';
import { columns } from './table-config';

const breadcrumbsItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Lista wizyt', isCurrentPage: true },
]

const PatientPersonalVisitsListPage = () => {
  const { data, error, isError, isLoading } = usePatientPersonalVisits();
  return (
    <>
      <Breadcrumbs items={breadcrumbsItems} />
      <ApiError error={error} isError={isError} />
      <Loader isLoading={isLoading} />

      {
        data && <DataTable<PatientPersonalVisit>
          columns={columns}
          data={data} 
          />
      }
    </>
  );
};

export default PatientPersonalVisitsListPage;
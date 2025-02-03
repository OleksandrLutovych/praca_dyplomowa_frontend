import { IconButton } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC } from 'react';
import { IoEyeSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { PatientPersonalVisit } from '../../utils/types';

type Props = {
  cell: CellContext<PatientPersonalVisit, unknown>
}
const TableActions: FC<Props> = ({ cell }) => {
  const navigate = useNavigate()
  const id = cell.row.original.id;
  return (
    <IconButton color="primary" onClick={() => navigate(`/dashboard/my-visits/${id}`)}><IoEyeSharp /></IconButton>
  );
};

export default TableActions;
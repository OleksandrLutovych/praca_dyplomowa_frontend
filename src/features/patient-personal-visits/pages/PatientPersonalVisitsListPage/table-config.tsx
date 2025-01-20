import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { PatientPersonalVisit } from "../../utils/types";
import { format } from "date-fns";
import { visitSubTypes, visitTypes } from "../../../doctors/utils/options";
import { Button, IconButton } from "@mui/material";
import { IoEyeSharp } from "react-icons/io5";

const columnHelper = createColumnHelper<PatientPersonalVisit>();
const columns: ColumnDef<PatientPersonalVisit, any>[] = [
  columnHelper.accessor('date', {
    header: 'Data wizyty',
    cell: (row) => format(row.getValue(), 'dd.MM.yyyy HH:mm'),
  }),
  columnHelper.accessor('doctor', {
    header: 'Lekarz',
    cell: (row) => {
      const doctor = row.getValue().user;
      return `${doctor.firstName} ${doctor.lastName}`;
    },
  }),
  columnHelper.accessor('doctor.proffesion', {
    header: 'Specjalizacja',
    cell: (row) => {
      const proffesion = row.getValue();
      return proffesion;
    },
  }),
  columnHelper.accessor('place', {
    header: 'Miejsce odbycia',
    cell: (row) => row.renderValue(),
  }),
  columnHelper.accessor('type', {
    header: 'Typ wizyty',
    cell: (row) => visitTypes.find((type) => type.key === row.getValue())?.label,
  }),
  columnHelper.accessor('subType', {
    header: 'Opis',
    cell: (row) => visitSubTypes.find((type) => type.key === row.getValue())?.label,
  }),
  columnHelper.display({
    id: 'actions',
    header: 'Akcje',
    cell: (cell) => <IconButton color="primary" onClick={() => console.log(cell.row)}><IoEyeSharp /></IconButton>,
  })
]

export { columns }
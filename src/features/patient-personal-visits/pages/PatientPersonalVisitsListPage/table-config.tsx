import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import StatusIcon from "../../../../shared/ui/StatusIcon";
import { visitSubTypes, visitTypes } from "../../../doctors/utils/options";
import { PatientPersonalVisit } from "../../utils/types";
import TableActions from "./TableActions";

const columnHelper = createColumnHelper<PatientPersonalVisit>();
const columns: ColumnDef<PatientPersonalVisit, any>[] = [
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (row) => <StatusIcon status={row.getValue()} size={30} />,
  }),
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
    cell: (cell) => <TableActions cell={cell} />,
  })
]

export { columns };

import { Divider, Stack, Typography } from "@mui/material";
import { addHours, differenceInMinutes, format } from "date-fns";
import { FC } from "react";
import { FaStethoscope, FaUser } from "react-icons/fa";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { GrMoney } from "react-icons/gr";
import { IoMdTime } from "react-icons/io";
import { MdMergeType } from "react-icons/md";
import { visitSubTypes, visitTypes } from "../../../doctors/utils/options";
import { Consult } from "../../utils/types";
import { GoNumber } from "react-icons/go";
import StatusIcon from "../../../../shared/ui/StatusIcon";

type Props = {
  data: Consult
}
const ConsultInfoCard: FC<Props> = ({ data }) => {

  const duration = differenceInMinutes(addHours(data.date, 1), new Date(data.date));
  const date = `${format(data.date, 'HH:mm')} - ${format(addHours(data.date, 1), 'HH:mm ')}`

  return (
    <>
      <Stack direction={"row"} alignItems={'center'} justifyContent={'space-between'}>
        <Stack direction={'row'} alignItems={'center'} gap={1}>
          <FaRegCalendarCheck size={20} color="#3B9AB8" />
          <Typography variant='h5'>Podgląd wizyty</Typography>
        </Stack>
        <Typography variant='body1'>{format(data.date, 'dd-LL-yyyy')}</Typography>
      </Stack>

      <Divider sx={{ my: 5 }} />

      <Stack direction={"row"} alignItems={'center'} gap={2}>
        <FaStethoscope size={25} />
        <Typography variant='h6'>{data.service.service}</Typography>

        <Stack direction={"row"} alignItems={'center'} gap={2} ml={10}>
          <StatusIcon status={data.status} size={30} />
          <Typography variant='body1'>Status</Typography>
        </Stack>
      </Stack>



      <Divider sx={{ my: 5 }} />

      <Stack gap={3} color='#7E7E7E'>


        <Stack direction={"row"} alignItems={'center'} gap={2}>
          <FaUser size={25} />
          <Typography variant='body1'>{data.patient.user.firstName} {data.patient.user.lastName}</Typography>
        </Stack>
        <Stack direction={"row"} alignItems={'center'} gap={2}>
          <IoMdTime size={25} />
          <Typography variant='body1'>{duration} min</Typography>
        </Stack>
        <Stack direction={"row"} alignItems={'center'} gap={2}>
          <MdMergeType size={25} />
          <Typography variant='body1'>{visitTypes.find(vt => vt.key === data.type)?.label}</Typography>
        </Stack>
        <Stack direction={"row"} alignItems={'center'} gap={2}>
          <GoNumber size={25} />
          <Typography variant='body1'>{visitSubTypes.find(vt => vt.key === data.subType)?.label}</Typography>
        </Stack>
        <Stack direction={"row"} alignItems={'center'} gap={2}>
          <GrMoney size={25} />
          <Typography variant='body1'>{data.service.price} zl</Typography>
        </Stack>
        <Stack direction={"row"} alignItems={'center'} gap={2}>
          <FaRegCalendarCheck size={25} />
          <Typography variant='body1' color="red">{date}</Typography>
        </Stack>
      </Stack>
      <Divider sx={{ my: 5 }} />
    </>
  );
};

export default ConsultInfoCard;
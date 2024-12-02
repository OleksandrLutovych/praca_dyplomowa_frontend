import { FC } from 'react';
import { Visit } from '../../utils/types';
import { Alert, Button, Card, Stack, Typography } from '@mui/material';
import { FcApproval } from "react-icons/fc";
import { FaUserDoctor } from "react-icons/fa6";
import { GrMoney } from "react-icons/gr";
import { MdMergeType } from "react-icons/md";
import { addHours, differenceInMinutes, format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

type Props = {
  data: Visit;
}

const AfterCreateVisitCard: FC<Props> = ({ data }) => {

  const navigate = useNavigate();

  const duration = differenceInMinutes(addHours(data.date, 1), new Date(data.date));
  const date = `${format(data.date, 'HH:mm')} - ${format(addHours(data.date, 1), 'HH:mm, eeee, d ')}`

  return (
    <Card sx={{ p: '25px', maxWidth: "1000px", mx: 'auto' }}>
      <Stack direction={"row"} alignItems={'center'} gap={5}>
        <FcApproval size={50} />
        <Typography variant='h5'>Podsumowanie wizyty</Typography>
      </Stack>

      <Stack sx={{ mt: 5 }} gap={3} color='#7E7E7E'>
        <Alert severity="info">
          <Typography variant='body2'>Na skrzyńkę pocztową zostało wysłane potwierdzenie. Sprawdż jak się przygotować do wizyty!</Typography>
        </Alert>

        <Stack direction={"row"} alignItems={'center'} gap={2}>
          <FaUserDoctor size={25} />
          <Typography variant='body1'>{data.doctor.user.firstName} {data.doctor.user.lastName}</Typography>
        </Stack>
        <Stack direction={"row"} alignItems={'center'} gap={2}>
          <FaUserDoctor size={25} />
          <Typography variant='body1'>{duration} min</Typography>
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
          <FaUserDoctor size={25} />
          <Typography variant='body1'>{date}</Typography>
        </Stack>
      </Stack>

      <Button variant='contained' sx={{ mt: 5 }} onClick={() => navigate('/dashboard')}>Wróć</Button>

    </Card>
  );
};

export default AfterCreateVisitCard;
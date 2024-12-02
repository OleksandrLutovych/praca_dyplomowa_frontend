import { Card, Stack, Typography } from '@mui/material';
import { addHours, format } from 'date-fns';
import { FC } from 'react';
import { CalendarEvent } from '../../../utils/types';
import { useNavigate } from 'react-router-dom';

type Props = {
  data: CalendarEvent
}

const UpcomingVisitCard: FC<Props> = ({ data }) => {
  const navigate = useNavigate();
  const { title, start, id } = data;

  const handleEventClick = () => {
    navigate(`/dashboard/consults/${id}`)
  }
  return (
    <Card sx={{ height: "85px", p: '20px', bgcolor: "#F6F6F6", cursor: "pointer", ":hover": { bgcolor: "#3B9AB850" } }} onClick={handleEventClick}>
      <Stack>
        <Typography variant="h6">{title}</Typography>
        <Stack direction={"row"} justifyContent={'space-between'} color={"#7A7D84"}>
          <Typography variant="body2">{`${format(start, "HH:mm")} - ${format(addHours(start, 1), 'HH:mm')}`}</Typography>
          <Typography variant="body2">{format(start, 'LLLL d, yyyy')}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

export default UpcomingVisitCard;
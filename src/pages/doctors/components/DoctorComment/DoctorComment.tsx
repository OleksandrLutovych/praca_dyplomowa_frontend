import { Card, CardActions, CardContent, Stack, Typography } from '@mui/material';
import { format } from 'date-fns';
import React, { FC } from 'react';

type Props = {
  author: string,
  message: string,
  date: Date
}

const DoctorComment: FC<Props> = ({ author, date, message }) => {
  return (
    <Card sx={{ my: 2 }}>
      <CardContent>
        <Stack>
          <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
            {author}
          </Typography>
          <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
            {date && format(date, 'dd.MMMM.YYYY HH:mm')}
          </Typography>
        </Stack>
        <Typography variant="h5" component="div">
          {message}
        </Typography>
      </CardContent>

    </Card>

  );
};

export default DoctorComment
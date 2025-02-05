import { Box, Stack, Typography } from '@mui/material';

const CalendarLegend = () => {
  return (
    <Stack direction='row' justifyContent={'space-between'} spacing={2} sx={{ my: 2 }}>
      <Stack direction='row' spacing={1} alignItems='center'>
        <Box sx={{ bgcolor: 'green', width: 20, height: 20, borderRadius: 2 }} />
        <Typography> - Wizyta zaakceptowana</Typography>
      </Stack>
      <Stack direction='row' spacing={1} alignItems='center'>
        <Box sx={{ bgcolor: 'red', width: 20, height: 20, borderRadius: 2 }} />
        <Typography> - Wizyta odrzucona</Typography>
      </Stack>
      <Stack direction='row' spacing={1} alignItems='center'>
        <Box sx={{ bgcolor: 'blue', width: 20, height: 20, borderRadius: 2 }} />
        <Typography> - Wizyta zakończona</Typography>
      </Stack>
      <Stack direction='row' spacing={1} alignItems='center'>
        <Box sx={{ bgcolor: 'gray', width: 20, height: 20, borderRadius: 2 }} />
        <Typography> - Wizyta utworzona</Typography>
      </Stack>
    </Stack>
  );
};

export default CalendarLegend;
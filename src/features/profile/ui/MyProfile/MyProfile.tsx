import { Avatar, Card, Stack, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';


const MyProfile = () => {
  return (
    <>
      <Typography variant="h4">Mój profil</Typography>
      <Stack direction="column" spacing={4}>
        <Card sx={{ p: '31px 20px' }}>

          <Stack direction={'row'} spacing={3} alignItems={'center'}>
            <Avatar sx={{ bgcolor: 'orange', width: 100, height: 100 }}>N</Avatar>
            <Stack direction={'column'} sx={{ mt: 3 }}>
              <Typography sx={{ fontSize: "20px", color: "#434966", mb: 1 }}>Jan Kowalski</Typography>
              <Typography sx={{ fontSize: "18px", color: "#82889C" }}>Okulista</Typography>
              <Typography sx={{ fontSize: "14px", color: "#82889C" }}>Bydgoszcz</Typography>
            </Stack>
          </Stack>
        </Card>
        <Card sx={{ p: '31px 20px' }}>
          <Typography variant="h5">Dane personalne</Typography>

          <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 18 }} sx={{ mt: 3 }}>
            <Grid size={6}>
              <Typography sx={{ color: "#82889C" }}>Imię i Nazwisko</Typography>
            </Grid>
            <Grid size={6}>
              <Typography sx={{ color: "#82889C" }}>Data urodzenia</Typography>
            </Grid>
            <Grid size={6}>
              <Typography sx={{ color: "#82889C" }}>Wiek</Typography>

            </Grid>
            <Grid size={6}>
              <Typography sx={{ color: "#82889C" }}>Numer telefonu</Typography>

            </Grid>
            <Grid size={6}>
              <Typography sx={{ color: "#82889C" }}>Email</Typography>
            </Grid>
          </Grid>

        </Card>
        <Card sx={{ p: '31px 20px' }}>
          <Typography variant="h5">Moje usługi</Typography>
          <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 18 }} sx={{ mt: 3 }}>
            <Grid size={6}>
              <Typography sx={{ color: "#82889C" }}>Konsultacja</Typography>
            </Grid>
            <Grid size={6}>
              <Typography sx={{ color: "#82889C" }}>EKG</Typography>
            </Grid>
            <Grid size={6}>
              <Typography sx={{ color: "#82889C" }}>Badanie wzroku</Typography>
            </Grid>
          </Grid>
        </Card>
      </Stack>
    </>
  );
};

export default MyProfile;
import { Avatar, Button, Card, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { FC, useState } from 'react';
import { DoctorProfileData } from '../../utils/types';
import Modal from '../../../../shared/ui/Modal';
import { DoctorServiceFormData, DoctorServicesForm } from '../../forms';
import { useCreateDoctorServiceData } from '../../hooks/useCreateDoctorServiceData';
import { useQueryClient } from '@tanstack/react-query';
import { doctorSpecialityLabel } from '../../../../entities/doctor-speciality/options';

type Props = {
  data: DoctorProfileData
}

const DoctorProfile: FC<Props> = ({ data }) => {

  const [open, setOpen] = useState(false);

  const handleModalOpen = () => {
    setOpen(true);
  }

  const queryClient = useQueryClient();
  const { mutate } = useCreateDoctorServiceData({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctor-profile'] });
      setOpen(false);
    }
  });

  const handleFormSubmit = (data: DoctorServiceFormData) => {
    mutate(data);
  }

  if (!data) return null;

  return (
    <Stack direction="column" spacing={4}>
      <Card sx={{ p: '31px 20px' }}>

        <Stack direction={'row'} spacing={3} alignItems={'center'}>
          <Avatar sx={{ bgcolor: 'orange', width: 100, height: 100 }}>N</Avatar>
          <Stack direction={'column'} sx={{ mt: 3 }}>
            <Typography sx={{ fontSize: "20px", color: "#434966", mb: 1 }}>{`${data?.personalData.name} ${data?.personalData.lastName}`}</Typography>
            <Typography sx={{ fontSize: "18px", color: "#82889C" }}>{doctorSpecialityLabel(data?.professionalData.proffesion)}</Typography>
            <Typography sx={{ fontSize: "14px", color: "#82889C" }}>Bydgoszcz</Typography>
          </Stack>
        </Stack>
      </Card>
      <Card sx={{ p: '31px 20px' }}>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography variant="h5">Dane personalne</Typography>
        </Stack>

        <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 18 }} sx={{ mt: 3 }}>
          <Grid size={6}>
            <Typography sx={{ color: "#82889C" }}>Imię i Nazwisko</Typography>
            <Typography sx={{ color: "#434966", fontWeight: 600 }}>{`${data?.personalData.name} ${data?.personalData.lastName}`}</Typography>
          </Grid>
          <Grid size={6}>
            <Typography sx={{ color: "#82889C" }}>Data urodzenia</Typography>
          </Grid>
          <Grid size={6}>
            <Typography sx={{ color: "#82889C" }}>Wiek</Typography>

          </Grid>
          <Grid size={6}>
            <Typography sx={{ color: "#82889C" }}>Numer telefonu</Typography>
            <Typography sx={{ color: "#434966", fontWeight: 600 }}>{data?.contactData.phone}</Typography>
          </Grid>
          <Grid size={6}>
            <Typography sx={{ color: "#82889C" }}>Email</Typography>
            <Typography sx={{ color: "#434966", fontWeight: 600 }}>{data?.contactData.email}</Typography>
          </Grid>
        </Grid>
      </Card>

      <Card sx={{ p: '31px 20px' }}>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography variant="h5">Dane profesjonalne</Typography>
        </Stack>
        <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 18 }} sx={{ mt: 3 }}>
          <Grid size={6}>
            <Typography sx={{ color: "#82889C" }}>Wykształcenie</Typography>
            <Typography sx={{ color: "#434966", fontWeight: 600 }}>{`${data?.professionalData.education}`}</Typography>
          </Grid>

          <Grid size={6}>
            <Typography sx={{ color: "#82889C" }}>Opis</Typography>
            <Typography sx={{ color: "#434966", fontWeight: 600 }}>{`${data?.professionalData.about ?? ""}`}</Typography>

          </Grid>
        </Grid>
      </Card>

      <Card sx={{ p: '31px 20px' }}>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography variant="h5">Moje usługi</Typography>
          <Button variant="contained" color='success' onClick={handleModalOpen}>Dodaj</Button>
        </Stack>
        <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 18 }} sx={{ mt: 3 }}>
          {
            data?.services.map((service, index) => (
              <Grid size={6} key={index}>
                <Typography sx={{ color: "#82889C" }}>{service.service}</Typography>
                <Typography sx={{ color: "#434966", fontWeight: 600 }}>{service.price} zł</Typography>
                <Typography sx={{ color: "#434966" }}>{service.recomendations}</Typography>
              </Grid>
            ))
          }

        </Grid>
      </Card>
      <Modal handleClose={() => setOpen(false)} open={open} >
        <Stack>
          <Typography variant="h5" mb={5}>Dodaj usługę</Typography>
          <DoctorServicesForm handleFormSubmit={handleFormSubmit} />
        </Stack>
      </Modal>
    </Stack>
  );
};

export default DoctorProfile;
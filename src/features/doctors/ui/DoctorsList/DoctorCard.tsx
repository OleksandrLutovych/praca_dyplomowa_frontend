import { Avatar, Box, Button, Card, CardContent, Divider, List, ListItem, Rating, Stack, Typography } from "@mui/material";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { FC } from "react";
import { DoctorSpeciality } from "../../../../entities/doctor-speciality/enum";
import { doctorSpecialityLabel } from "../../../../entities/doctor-speciality/options";

type Props = {
  name: string;
  proffesion: DoctorSpeciality;
  services: { id: number, service: string, price: number }[];
  rating: number;
  isAvailable: boolean;
  closestAvailableDate: Date
  onClick: () => void;
}

const DoctorCard: FC<Props> = ({ name, proffesion, services, rating, onClick, isAvailable, closestAvailableDate }) => {
  return (
    <Card sx={{ minWidth: 360, borderRadius: 5 }}>
      <CardContent sx={{ p: 4 }}>

        <Stack direction={'row'} justifyContent={'flex-start'} alignItems={'center'} gap={2}>
          <Avatar sx={{ bgcolor: 'orange', width: 80, height: 80 }}>N</Avatar>
          <Stack>
            <Typography gutterBottom variant="h6" sx={{ mb: 0 }}>
              {name}
            </Typography>
            <Typography gutterBottom variant="h6" sx={{ color: '#1976d2' }}>
              {doctorSpecialityLabel(proffesion)}
            </Typography>
            <Rating
              name="simple-controlled"
              value={rating}
              readOnly
            />
          </Stack>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Stack direction={'row'} justifyContent={'flex-start'} alignItems={'flex-start'} gap={2}>
          <Box>
            <Typography gutterBottom variant="h6" component="div" sx={{ opacity: 0.5 }}>
              Usługi:
            </Typography>
            <List
              sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
              aria-label="contacts"
            >
              {services.map(({ id, price, service }) => (
                <ListItem disablePadding key={id}>
                  {service} {price} zł
                </ListItem>
              ))}
            </List>
          </Box>
        </Stack>

        <Button variant="contained" sx={{ width: '100%', mt: 2 }} onClick={onClick} disabled={!isAvailable}>
          {isAvailable ? 'Umów się na wizytę' : 'Brak terminów'}
        </Button>
        {closestAvailableDate && <Typography sx={{ mt: 2, opacity: 0.5 }}>Najbliższy termin: {format(closestAvailableDate, "dd.MMMM HH:mm", {
          locale: pl
        })}</Typography>}
      </CardContent>
    </Card >
  );
};

export default DoctorCard;
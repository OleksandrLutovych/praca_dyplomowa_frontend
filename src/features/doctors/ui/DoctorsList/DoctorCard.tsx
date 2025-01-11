import { Avatar, Box, Button, Card, CardContent, Divider, List, ListItem, Rating, Stack, Typography } from "@mui/material";
import { FC } from "react";

type Props = {
  name: string;
  proffesion: string;
  services: string[];
  rating: number;
  image: string;
  onClick: () => void;
}

const DoctorCard: FC<Props> = ({ name, proffesion, services, rating, onClick }) => {
  return (
    <Card sx={{ minWidth: 360, borderRadius: 5 }}>
      <CardContent sx={{ p: 4 }}>

        <Stack direction={'row'} justifyContent={'flex-start'} alignItems={'center'} gap={2}>
          <Avatar sx={{ bgcolor: 'orange', width: 80, height: 80 }}>N</Avatar>
          <Stack>
            <Typography gutterBottom variant="h6" sx={{ mb: 0 }}>
              prof. {name}
            </Typography>
            <Typography gutterBottom variant="h6" sx={{ color: '#1976d2' }}>
              {proffesion}
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
              {services.map((service) => (
                <ListItem disablePadding key={service}>
                  {service}
                </ListItem>
              ))}
            </List>
          </Box>
          <Divider orientation="vertical" sx={{ height: 90 }} />
          <Box>
            <Typography gutterBottom variant="h6" component="div" sx={{ opacity: 0.5 }}>
              Cena:
            </Typography>
            <List
              sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
              aria-label="contacts"
            >
              od 350 zł
            </List>
          </Box>
        </Stack>

        <Button variant="contained" sx={{ width: '100%', mt: 2 }} onClick={onClick}>Umów się na wizytę</Button>
      </CardContent>
    </Card >
  );
};

export default DoctorCard;
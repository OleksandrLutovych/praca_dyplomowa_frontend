import { Avatar, Box, Card, CardActionArea, CardContent, List, ListItem, Rating, Stack, Typography } from "@mui/material";
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
        <Card sx={{ minWidth: 360 }} onClick={onClick}>
            <CardActionArea >
                <CardContent>
                    <Avatar sx={{ bgcolor: 'orange', width: 100, height: 100 }}>N</Avatar>
                    <Stack sx={{ mt: 3 }}>
                        <Typography gutterBottom variant="h6" sx={{ mb: 0 }}>
                            prof. {name}
                        </Typography>
                        <Typography gutterBottom variant="h6" sx={{ color: '#1976d2' }}>
                            {proffesion}
                        </Typography>
                        <Typography gutterBottom >
                            Ocena: {rating}
                        </Typography>
                        <Rating
                            name="simple-controlled"
                            value={3}
                        />
                    </Stack>
                    <Box sx={{ mt: 3 }}>
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
                    <Box sx={{ mt: 2 }}>
                        <Typography gutterBottom variant="h6" component="div" sx={{ opacity: 0.5 }}>
                            Cena:
                        </Typography>
                        <List
                            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                            aria-label="contacts"
                        >
                            <ListItem disablePadding>
                                od 140zł
                            </ListItem>
                        </List>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card >
    );
};

export default DoctorCard;
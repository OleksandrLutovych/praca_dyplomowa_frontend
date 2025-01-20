import { Box, Button, Card, Container, Stack, Typography } from "@mui/material";
import { DashboardSearch } from "../../components";
import { IoIosArrowForward as ArrowIcon } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <></>
    // <Container maxWidth={'xl'}>
    //   <Box sx={{ position: "relative" }}>
    //     <Card sx={{ height: "300px", backgroundImage: "url('public/img/main_card_bg.png')", backgroundSize: "cover", borderRadius: 10 }}>
    //       <Box sx={{ position: "absolute", top: 260, left: '25%', borderRadius: 10 }}>
    //         <DashboardSearch />
    //       </Box>
    //     </Card>
    //   </Box>
    //   <Stack sx={{ mt: 20, mb: 5 }} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
    //     <Typography variant="h4">Rekomendowane lekarzy</Typography>
    //     <Button variant="text" color="primary" sx={{ display: 'flex', alignItems: "center" }} onClick={() => navigate('/dashboard/doctors')}>
    //       Zobacz wszystkich
    //       <ArrowIcon size={15} style={{ marginBottom: 3 }} />
    //     </Button>
    //   </Stack>

    // </Container>
  );
};

export default Dashboard;
import { Button, Divider, InputBase, Pagination, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../../../shared/ui";
import { useGetDoctors } from "../../hooks/useGetDoctors";
import DoctorCard from "./DoctorCard";
import { CiSearch as SearchIcon } from "react-icons/ci";

const DoctorsList = () => {
    const navigate = useNavigate();

    const handleClick = (id: number) => {
        navigate(`/dashboard/doctors/${id}`);
    }

    const handlePagination = (page: number) => {
        console.log(page);
    }

    const { data, isLoading, isSuccess } = useGetDoctors();
    console.log(data);
    return (
        <>
            <Loader isLoading={isLoading} />
            {
                isSuccess && data &&
                <>
                    <Paper
                        component="form"
                        sx={{ p: '2px 10px', display: 'flex', alignItems: 'center', width: 810, height: 81, borderRadius: 3, mb: 5 }}
                    >
                        <SearchIcon size={25} style={{ marginLeft: 10 }} />
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Wyszukaj lekarza"
                            inputProps={{ 'aria-label': 'search google maps' }}
                        />

                        <Divider sx={{ height: 28, mr: 3 }} orientation="vertical" />
                        <Button variant='contained' sx={{ borderRadius: 2 }}>Wyszukaj</Button>
                    </Paper>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 2, md: 2, lg: 3 }} alignItems="center" >
                        {data.data.map(({ user, rating, proffesion, id }) => (
                            <Grid key={id}>
                                <DoctorCard name={`${user.firstName} ${user.lastName}`}
                                    proffesion={proffesion}
                                    services={["Konsultacja andrologiczna", "Konsultacja andrologiczna"]}
                                    rating={rating}
                                    image=""
                                    onClick={() => handleClick(id)} />
                            </Grid>
                        ))}
                    </Grid>
                    <Pagination count={data.meta.total} page={data.meta.currentPage} color="primary" sx={{ mt: 5 }} onClick={() => handlePagination(1)} />
                </>
            }
        </>
    );
};

export default DoctorsList;
import { Box, Pagination, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Loader } from "../../../../shared/ui";
import { useGetDoctors } from "../../hooks/useGetDoctors";
import DoctorCard from "./DoctorCard";

const DoctorsList = () => {

    const handleClick = (index: number) => {
        console.log(index);
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
                    <Box sx={{ my: 2 }}>
                        <TextField id="outlined-basic" label="Imię i nazwisko..." variant="outlined" />
                    </Box>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 2, md: 2, lg: 3 }} alignItems="center" >
                        {data.data.map(({ user, rating, proffesion, id }, index) => (
                            <Grid key={id}>
                                <DoctorCard name={`${user.firstName} ${user.lastName}`}
                                    proffesion={proffesion}
                                    services={["Konsultacja andrologiczna", "Konsultacja andrologiczna"]}
                                    rating={rating}
                                    image=""
                                    onClick={() => handleClick(index)} />
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
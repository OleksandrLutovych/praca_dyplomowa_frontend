import React from 'react';
import {Grid} from "@mui/material";

const DoctorsList = () => {
    return (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {Array.from(Array(6)).map((_, index) => (
                <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                    <Item>{index + 1}</Item>
                </Grid>
            ))}
        </Grid>
    );
};

export default DoctorsList;
import Grid from "@mui/material/Grid2";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader } from "../../../../shared/ui";
import { FiltersBar, SearchBar } from "../../components";
import { useDoctors } from "../../hooks";
import DoctorCard from "./DoctorCard";

const DoctorsList = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();


  const handleClick = (id: number) => {
    navigate(`/dashboard/doctors/${id}`);
  }

  const { data, isLoading, isSuccess } = useDoctors();

  useEffect(() => {
    setSearchParams((prevParams) => {
      prevParams.set('page', '0');
      prevParams.set('perPage', '10');
      return prevParams;
    });

  }, [])

  return (
    <>
      <Loader isLoading={isLoading} />

      <SearchBar />
      <FiltersBar />

      {
        (isSuccess && data.length) ?
          <>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 2, md: 2, lg: 3 }} alignItems="center" >
              {data.map(({ user, rating, proffesion, id, services }) => (
                <Grid key={id}>
                  <DoctorCard name={`${user.firstName} ${user.lastName}`}
                    proffesion={proffesion}
                    services={services}
                    rating={rating}
                    onClick={() => handleClick(id)} />
                </Grid>
              ))}

            </Grid>
            {/* <Pagination count={data.meta.total} page={data.meta.currentPage} color="primary" sx={{ mt: 5 }} /> */}
          </>
          : <>Brak danych</>
      }
    </>
  );
};

export default DoctorsList;
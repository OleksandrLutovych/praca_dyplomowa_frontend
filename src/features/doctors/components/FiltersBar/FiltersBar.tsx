import { Accordion, AccordionDetails, AccordionSummary, Button, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { IoMdArrowDropdown } from "react-icons/io";
import { DateInput, SelectInput } from "../../../../shared/form-inputs";
import { doctorSpecialityOptions } from "../../../../entities/doctor-speciality/options";
import { useSearchParams } from "react-router-dom";

const FiltersBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { control, handleSubmit } = useForm()

  const handleFormSubmit = (data: any) => {
    setSearchParams(prevParams => {
      Object.entries(data).forEach(([key, value]) => {
        prevParams.set(key, value as string);
      })

      return prevParams;
    })
  }

  return (
    <Accordion
      sx={{ borderRadius: 2, boxShadow: 'none', borderBottom: '1px solid #e0e0e0', mb: 2 }}>
      <AccordionSummary
        expandIcon={<IoMdArrowDropdown />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography component="span">Wyszukiwanie zaawansowane</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Stack direction="column" spacing={2}>

            <SelectInput control={control} defaultValue="" label="" name="proffesion" options={doctorSpecialityOptions} title="Wybierz specjalizację" />
            <DateInput control={control} label="Data" name="date" title="" defaultValue={new Date()} />
            <Button type="submit" variant="outlined">Wyszukaj</Button>
          </Stack>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default FiltersBar;
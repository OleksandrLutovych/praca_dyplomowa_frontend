import { Controller, useForm } from "react-hook-form";
import CreateAppointmentFormData from "./types";
import { FC, useState } from "react";
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import Calendar from "react-calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultValues, schema } from "./config";
import { VisitType } from "../../../../entities/visits/enums";

type Props = {
  handleFormSubmit: (data: CreateAppointmentFormData) => void;
}

const CreateAppointmentForm: FC<Props> = ({ handleFormSubmit }) => {

  const [initialValue, onChange] = useState<Date>(new Date());
  const { handleSubmit, control } = useForm<CreateAppointmentFormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });
  const procedures = ['Konsultacja', 'USG'];
  const times = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];
  const visitTypes = () => Object.entries(VisitType).map(([key, value]) => value);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}
      style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 10, alignItems: 'center' }}>

      <Controller name={'procedure'} control={control} render={({ field: { onChange, value, }, fieldState: { error } }) => (
        <FormControl fullWidth sx={{ mt: 2 }} error={!!error}>
          <InputLabel id="procedure-label">Wybierz typ wizyty</InputLabel>
          <Select
            labelId="procedure-label"
            label="Wybierz zabieg"
            value={value}
            onChange={onChange}
          >
            {visitTypes().map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )} />
      <Controller name={'procedure'} control={control} render={({ field: { onChange, value, }, fieldState: { error } }) => (
        <FormControl fullWidth sx={{ mt: 2 }} error={!!error}>
          <InputLabel id="procedure-label">Wybierz zabieg</InputLabel>
          <Select
            labelId="procedure-label"
            label="Wybierz zabieg"
            value={value}
            onChange={onChange}
          >
            {procedures.map((procedure) => (
              <MenuItem key={procedure} value={procedure}>
                {procedure}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )} />

      <Controller name={'date'} control={control} render={
        ({ field: { onChange, value }, fieldState: { error } }) => {
          return (
            <Calendar onChange={onChange} value={value as Date}
            // tileDisabled={({ date, view }) => view === 'month' && date < new Date()} 
            />
          )
        }
      }
      />
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel id="procedure-label">Godzina wizyty</InputLabel>
        <Select
          labelId="procedure-label"
          label="Godzina wizyty"
        >
          {times.map((procedure) => (
            <MenuItem key={procedure} value={procedure}>
              {procedure}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        type="submit"
        variant="contained"
      >
        Potwierdż
      </Button>
    </form>
  )
};

export default CreateAppointmentForm;

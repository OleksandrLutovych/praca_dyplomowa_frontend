import { zodResolver } from "@hookform/resolvers/zod";
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { UseMutateFunction, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { endOfMonth, getHours, isPast, isSameDay, isWeekend, setHours, startOfMonth } from "date-fns";
import { FC, useMemo, useState } from "react";
import Calendar from "react-calendar";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { DoctorService } from "../../../../entities/doctor-service/types";
import { DoctorsApi } from "../../api";
import { VisitApi } from "../../api/visit-api";
import { visitSubTypes, visitTypes } from "../../utils/options";
import { defaultValues, schema } from "./config";
import CreateAppointmentFormData from "./types";

type Props = {
  mutate: UseMutateFunction<unknown, AxiosError, CreateAppointmentFormData, unknown>
}

const CreateAppointmentForm: FC<Props> = ({ mutate }) => {

  const params = useParams();
  const { id } = params;

  const [date, setDate] = useState<Date>(new Date())
  const [selectedHour, setSelectedHour] = useState<number | null>(null)

  const { handleSubmit, control } = useForm<CreateAppointmentFormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const { data } = useQuery<unknown, AxiosError, DoctorService[]>({
    queryKey: ['procedures', id],
    queryFn: async () => {
      const response = DoctorsApi.getServices({ id: Number(id) });

      const { data } = await response;

      return data;
    }
  })

  const { data: available } = useQuery<unknown, AxiosError, Date[]>({
    queryKey: ['available-times', id],
    queryFn: async () => {
      const response = VisitApi.available({ id: Number(id) });

      const { data } = await response;

      return data;
    }
  })

  const availableHours = useMemo(() => {

    return available?.filter((availableDate) =>
      isSameDay(date, availableDate)
    ).map((date) => getHours(date))

  }, [available, date])




  const handleFormSubmit = (values: CreateAppointmentFormData) => {
    if (!selectedHour) {
      throw new Error('Select hour!')
    }
    values.date = setHours(date, selectedHour);

    return mutate(values);
  };

  const hasAvailableHours = (date: Date) => (available?.filter((availableDate) => isSameDay(date, availableDate)).length ?? 0) > 0

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}
      style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 5, alignItems: 'center' }}>

      <Controller name={'date'} control={control} render={
        ({ field: { onChange, value }, fieldState: { error } }) => {
          return (
            <>
              <Calendar
                onChange={onChange}
                value={value as Date}
                view="month"
                locale="pl-PL"
                onClickDay={(date) => setDate(date)}
                activeStartDate={new Date()}
                allowPartialRange={false}
                minDate={startOfMonth(new Date())}
                maxDate={endOfMonth(new Date())}
                tileDisabled={({ date }) => isWeekend(date) || isPast(date) || !hasAvailableHours(date)}
                
              />
              {error?.message}
            </>

          )
        }
      }
      />
      <Controller name={'type'} control={control} render={({ field: { onChange, value, }, fieldState: { error } }) => (
        <FormControl fullWidth sx={{ mt: 2 }} error={!!error}>
          <InputLabel id="procedure-label">Wybierz rodzaj</InputLabel>
          <Select
            labelId="procedure-label"
            label="Wybierz zabieg"
            value={value}
            onChange={onChange}
          >
            {visitTypes.map(({ key, label }) => (
              <MenuItem key={key} value={key}>
                {label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )} />
      <Controller name={'subType'} control={control} render={({ field: { onChange, value, }, fieldState: { error } }) => (
        <FormControl fullWidth sx={{ mt: 2 }} error={!!error}>
          <InputLabel id="procedure-label">Wybierz typ</InputLabel>
          <Select
            labelId="procedure-label"
            label="Wybierz zabieg"
            value={value}
            onChange={onChange}
          >
            {visitSubTypes.map(({ key, label }) => (
              <MenuItem key={key} value={key}>
                {label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )} />
      <Controller name={'serviceId'} control={control} render={({ field: { onChange, value, }, fieldState: { error } }) => (
        <FormControl fullWidth sx={{ mt: 2 }} error={!!error}>
          <InputLabel id="procedure-label">Wybierz zabieg</InputLabel>
          <Select
            labelId="procedure-label"
            label="Wybierz zabieg"
            value={value}
            onChange={onChange}
          >
            {data?.map(({ id, price, service }) => (
              <MenuItem key={service} value={id}>
                {service}  {price} zł
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )} />

      <Controller name={'place'} control={control} render={({ field: { onChange, value, }, fieldState: { error } }) => (
        <FormControl fullWidth sx={{ mt: 2 }} error={!!error}>
          <TextField value={value} onChange={onChange} />
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )} />


      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>Godzina wizyty</InputLabel>
        <Select
          label="Godzina wizyty"
          onChange={(e) => setSelectedHour(e.target.value as number)}
          disabled={isWeekend(date) || isPast(date) || !date || !availableHours}
          required
        >
          {availableHours?.map((hour) => (
            <MenuItem key={hour} value={hour}>
              {hour}:00
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

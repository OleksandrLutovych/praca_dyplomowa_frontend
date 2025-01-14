import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { FormControl, FormLabel } from '@mui/material';

type Props = {
  name: string,
  label: string,
  title: string,
  defaultValue: Date | number,
  control: Control<any>
}

const TimeInput: FC<Props> = ({ control, defaultValue, label, name, title }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller name={name} control={control}
        render={
          ({ field: { onChange, value, }, fieldState: { error } }) => {
            return <FormControl sx={{ width: "100%" }}>
              <FormLabel htmlFor="email" sx={{ textAlign: 'start' }}>{title}</FormLabel>
              <TimePicker value={value} onChange={onChange} defaultValue={defaultValue} label={label} />
            </FormControl>
          }}
      />
    </LocalizationProvider>
  );
};

export default TimeInput;
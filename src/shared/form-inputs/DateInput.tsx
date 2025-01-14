import { FormControl, FormLabel } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';

type Props = {
  name: string,
  label: string,
  title: string,
  defaultValue: Date | number,
  control: Control<any>
}

const DateInput: FC<Props> = ({ control, defaultValue, label, name, title }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller name={name} control={control}
        render={
          ({ field: { onChange, value, }, fieldState: { error } }) => (
            <FormControl sx={{ width: "100%" }}>
              <FormLabel htmlFor="email" sx={{ textAlign: 'start' }}>{title}</FormLabel>
              <DatePicker value={value} onChange={onChange} defaultValue={defaultValue} label={label} />
            </FormControl>
          )}
      />
    </LocalizationProvider>
  );
};

export default DateInput;
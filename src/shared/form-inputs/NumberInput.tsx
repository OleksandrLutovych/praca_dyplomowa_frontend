import { FormControl, FormLabel, TextField } from '@mui/material';
import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';

type Props = {
  name: string,
  label: string,
  title: string,
  defaultValue: number,
  control: Control<any>
}

const NumberInput: FC<Props> = ({ name, label, defaultValue, control, title }) => {
  return (
    <Controller name={name} control={control}
      render={
        ({ field: { onChange, value, }, fieldState: { error } }) => (
          <FormControl sx={{ width: "100%" }}>
            <FormLabel sx={{ textAlign: 'start' }}>{title}</FormLabel>
            <TextField
              label={label}
              type='number'
              value={value}
              fullWidth
              margin="normal"
              error={!!error}
              onChange={(e) => {
                const inputValue = e.target.value;
                onChange(inputValue ? Number(inputValue) : '');
              }}
              defaultValue={defaultValue}
              helperText={error?.message}
            />
          </FormControl>
        )}
    />
  );
};

export default NumberInput;
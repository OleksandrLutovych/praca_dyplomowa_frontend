import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { SelectOptions } from '../types/universal-types';

type Props = {
  name: string,
  label: string,
  title: string,
  defaultValue: string,
  control: Control<any>
  options: SelectOptions
}

const SelectInput: FC<Props> = ({ control, defaultValue, label, name, title, options }) => {
  return (
    <Controller name={name} control={control} render={({ field: { onChange, value, }, fieldState: { error } }) => (
      <FormControl fullWidth sx={{ mt: 2 }} error={!!error}>
        <InputLabel id="procedure-label">{title}</InputLabel>
        <Select
          labelId={label}
          label="Wybierz zabieg"
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
        >
          {options.map(({ key, label }) => (
            <MenuItem key={key} value={key}>
              {label}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{error?.message}</FormHelperText>
      </FormControl>
    )} />
  );
};

export default SelectInput;
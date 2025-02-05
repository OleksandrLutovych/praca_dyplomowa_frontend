import { FormControl, FormLabel, TextareaAutosize } from "@mui/material";
import { FC } from 'react';
import { Control, Controller } from "react-hook-form";

type Props = {
  name: string,
  title: string,
  defaultValue: string,
  control: Control<any>
}
const Textarea: FC<Props> = ({ name, defaultValue, control, title }) => {
  return (
    <Controller name={name} control={control}
      render={
        ({ field: { onChange, value, } }) => (
          <FormControl sx={{ width: "100%" }}>
            <FormLabel htmlFor="email" sx={{ textAlign: 'start' }}>{title}</FormLabel>
            <TextareaAutosize
              value={value}
              onChange={onChange}
              defaultValue={defaultValue}
              minRows={4}
              style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', width: '100%', resize: 'vertical', }}

            />
          </FormControl>
        )}
    />
  );
};

export default Textarea;
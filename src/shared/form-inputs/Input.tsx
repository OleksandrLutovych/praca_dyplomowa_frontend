import { FC } from 'react';
import { FormControl, FormLabel, TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";

type Props = {
    name: string,
    label: string,
    title: string,
    type: "text" | "email" | "password"
    defaultValue: string,
    control: Control<any>
}
const Input: FC<Props> = ({ name, label, type, defaultValue, control, title }) => {
    return (
        <Controller name={name} control={control}
            render={
                ({ field: { onChange, value, }, fieldState: { error } }) => (
                    <FormControl sx={{ width: "100%" }}>
                        <FormLabel htmlFor="email" sx={{ textAlign: 'start' }}>{title}</FormLabel>
                        <TextField
                            label={label}
                            type={type}
                            value={value}
                            fullWidth
                            margin="normal"
                            error={!!error}
                            onChange={onChange}
                            defaultValue={defaultValue}
                            helperText={error?.message}
                        />
                    </FormControl>
                )}
        />
    );
};

export default Input;
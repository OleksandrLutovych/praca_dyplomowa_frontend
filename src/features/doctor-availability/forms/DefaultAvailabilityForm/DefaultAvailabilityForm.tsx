import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";

import { FC } from "react";
import { useForm } from "react-hook-form";
import { NumberInput, TimeInput } from "../../../../shared/form-inputs";
import { DefaultAvailabilityFormData, defaultValues, schema } from "./config";

type Props = {
  handleFormSubmit: (values: DefaultAvailabilityFormData) => void
  entityValues: { start: Date, end: Date }
}

const DefaultAvailabilityForm: FC<Props> = ({ handleFormSubmit, entityValues }) => {

  const _defaultValues = defaultValues(entityValues.start, entityValues.end)

  const { handleSubmit, control, } = useForm<DefaultAvailabilityFormData>({
    resolver: zodResolver(schema),
    defaultValues: _defaultValues
  });

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}
      style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 15, alignItems: 'center', backgroundColor: "white", padding: 5 }}>
      <NumberInput control={control} defaultValue={_defaultValues.durationInMinutes} label="Długośc trwania wizyty" name="durationInMinutes" title="" />
      <TimeInput control={control} defaultValue={_defaultValues.start} label="Godzina rozpoczęcia pracy" name="start" title="" />
      <TimeInput control={control} defaultValue={_defaultValues.end} label="Godzina zakończenia pracy" name="end" title="" />

      <Button
        type="submit"
        variant="contained"
        sx={{ width: '100%' }}
      >
        Potwierdż
      </Button>
    </form >
  );
};

export default DefaultAvailabilityForm;
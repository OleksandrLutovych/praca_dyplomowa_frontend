import { FC } from 'react';
import { PatientActivateFormData, schema, defaultValues } from './config';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../../../shared/form-inputs';
import { Button } from '@mui/material';


type Props = {
  handleFormSubmit: (data: PatientActivateFormData) => void;
}
const PatientActivateForm: FC<Props> = ({ handleFormSubmit }) => {

  const { handleSubmit, register, formState: { errors }, control } = useForm<PatientActivateFormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}
      style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 10 }}>

      <Input name={"age"} label={""} type={"text"} defaultValue={defaultValues.age}
        control={control} title={"Wiek"} />
      <Input name={"pesel"} label={""} type={"text"} defaultValue={defaultValues.pesel}
        control={control} title={"Pesel"} />
      <Input name={"address"} label={"Warszawa, ul. Jana Pawla"} type={"text"} defaultValue={defaultValues.address}
        control={control} title={"Adres zamieszkania"} />
      <Input name={"phone"} label={"456258741"} type={"text"} defaultValue={defaultValues.phone}
        control={control} title={"Numer telefonu"} />

      <Button
        type="submit"
        variant="contained"
      >
        Aktywuj konto
      </Button>
    </form>
  );
};

export default PatientActivateForm;
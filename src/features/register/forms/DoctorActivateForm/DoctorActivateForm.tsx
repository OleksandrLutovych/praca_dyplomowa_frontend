import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Input, SelectInput, Textarea } from '../../../../shared/form-inputs';
import { defaultValues, DoctorActivateFormData, schema } from './config';
import { Button, Typography } from '@mui/material';
import { doctorSpecialityOptions } from '../../../../entities/doctor-speciality/options';

type Props = {
  handleFormSubmit: (data: DoctorActivateFormData) => void;
}

const DoctorActivateForm: FC<Props> = ({ handleFormSubmit }) => {

  const { handleSubmit, control } = useForm<DoctorActivateFormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}
      style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 10 }}>

      <Typography textAlign={'center'} variant='h5'>Wypełnij pozostałe dane</Typography>
      <SelectInput
        name={"proffesion"}
        label={"Okulista"}
        defaultValue={defaultValues.proffesion}
        control={control}
        title={"Specjalizacja"}
        options={doctorSpecialityOptions} />

      <Input name={"education"} label={"Wykształcenie"} type={"text"} defaultValue={defaultValues.education}
        control={control} title={""} />

      <Textarea name={"about"} defaultValue={defaultValues.about}
        control={control} title={"O mnie"} />


      <Button
        type="submit"
        variant="contained"
      >
        Aktywuj konto
      </Button>
    </form>
  );
};

export default DoctorActivateForm;
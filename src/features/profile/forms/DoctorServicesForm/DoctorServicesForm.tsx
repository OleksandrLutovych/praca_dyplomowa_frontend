import { FC } from 'react';
import DoctorServiceFormData from './types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema, defaultValues } from './config';
import { Input, Textarea, NumberInput } from '../../../../shared/form-inputs';
import { Button } from '@mui/material';

type Props = {
  handleFormSubmit: (data: DoctorServiceFormData) => void;
}

const DoctorServicesForm: FC<Props> = ({ handleFormSubmit }) => {

  const { handleSubmit, control } = useForm<DoctorServiceFormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}
      style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 10, alignItems: 'center' }}>

      <Input control={control} defaultValue={defaultValues.service} label='Konsultacja' name='service' title='Usługa' type='text' />
      <NumberInput control={control} defaultValue={defaultValues.price} name='price' title='Cena' label='' />
      <Textarea control={control} defaultValue={defaultValues.recomendation} name='recomendation' title='Zalecenia przed usługą' />

      <Button
        type="submit"
        variant="contained"
        fullWidth
      >
        Potwierdż
      </Button>
    </form>
  );
};

export default DoctorServicesForm;
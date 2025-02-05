import React from 'react';
import { defaultValues, FinishConsultFormData, schema } from './config';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Textarea } from '../../../../shared/form-inputs';
import { useParams } from 'react-router-dom';
import { useSendRecomendationsDoctorConsult } from '../../hooks';
import { ApiError } from '../../../../shared/ui';
import { Alert, Button, Collapse } from '@mui/material';

const FinishConsultForm = () => {

  const params = useParams();
  const { id } = params;

  const { handleSubmit, control, reset } = useForm<FinishConsultFormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const { mutateAsync, isPending, error, isError, isSuccess } = useSendRecomendationsDoctorConsult({ id: Number(id) });

  const handleFormSubmit = (data: FinishConsultFormData) => {
    mutateAsync(data).then(() => {
      reset();
    });
  }

  return (
    <>
      <ApiError error={error} isError={isError} />
      {isSuccess && <Collapse in={isSuccess}>
        <Alert
          severity={'success'}
          sx={{ mb: 2 }}
        >
          Zalecenia zostały wysłane
        </Alert>
      </Collapse>}
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Textarea control={control} defaultValue={defaultValues.finishRecomendations} name='finishRecomendations' title='Rekomendacja końcowe' />
        <Button type='submit'>Wyślij</Button>

      </form>
    </>
  );
};

export default FinishConsultForm;
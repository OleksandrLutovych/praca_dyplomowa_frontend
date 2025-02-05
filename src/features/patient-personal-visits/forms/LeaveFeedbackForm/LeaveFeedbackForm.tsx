import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Button, Collapse, Rating } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Textarea } from '../../../../shared/form-inputs';
import { ApiError } from '../../../../shared/ui';
import usePatientLeaveFeedback from '../../hooks/usePatientLeaveFeedback';
import { defaultValues, LeaveFeedbackFormData, schema } from './config';

const LeaveFeedbackForm = () => {
  const params = useParams();
  const { id } = params;

  const { handleSubmit, control, reset } = useForm<LeaveFeedbackFormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const { mutateAsync, isPending, error, isError, isSuccess } = usePatientLeaveFeedback(Number(id));

  const handleFormSubmit = (data: LeaveFeedbackFormData) => {
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
          Twoja opinia została wystawiona
        </Alert>
      </Collapse>}
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Controller control={control} name='ranking' render={({ field: { name, onChange, value } }) =>
          <Rating onChange={onChange} value={value} name='name' />

        } />
        <Textarea control={control} defaultValue={defaultValues.comment} name='comment' title='Napisz co myślisz o wizycie' />

        <Button type='submit'>Wyślij</Button>

      </form>
    </>
  );
};

export default LeaveFeedbackForm;
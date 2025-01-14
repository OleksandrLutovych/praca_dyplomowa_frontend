import { FC } from 'react';
import Modal from '../../../../shared/ui/Modal';
import { DefaultAvailabilityForm } from '../../forms';
import { DefaultAvailabilityFormData } from '../../forms/DefaultAvailabilityForm/config';

type Props = {
  onClose: () => void;
  isOpen: boolean;
  value: { id: number; start: Date; end: Date };
  handleFormSubmit: (values: DefaultAvailabilityFormData) => void;
}

const CreateEventModal: FC<Props> = ({ onClose, isOpen, value, handleFormSubmit }) => {

  return (
    <Modal handleClose={onClose} open={isOpen}>
      <DefaultAvailabilityForm handleFormSubmit={handleFormSubmit} entityValues={value} />
    </Modal>
  );
};

export default CreateEventModal;
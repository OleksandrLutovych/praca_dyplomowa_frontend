import { Box, Modal as MuiModal } from '@mui/material';
import { FC, ReactNode } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  p: 4,
};

type Props = {
  open: boolean;
  handleClose: () => void;
  children: ReactNode;
}

const Modal: FC<Props> = ({ children, handleClose, open }) => {

  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        {children}
      </Box>
    </MuiModal>
  );
};

export default Modal;
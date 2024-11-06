import { Box, CircularProgress } from '@mui/material';
import { FC } from 'react';

type Props = {
  isLoading: boolean;
}

const Loader: FC<Props> = ({ isLoading }) => {
  return (
    <>
      {isLoading && <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          minWidth: '100vw',
          position: 'fixed',
          top: 0,
          left: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          zIndex: 1300,
        }}
      >
        <CircularProgress />
      </Box>
      }
    </>
  );
};

export default Loader;
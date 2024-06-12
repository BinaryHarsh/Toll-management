import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
export default function Loder() {
  return (
        <Backdrop
        sx={{ color: '#ffff', zIndex: (theme) => theme.zIndex.drawer + 10 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
  );
}

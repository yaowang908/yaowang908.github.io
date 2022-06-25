import * as React from 'react';
import Box from '@mui/material/Box';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        padding: '5vh 10vw 2vh 10vw',
      }}
    >
      {children}
    </Box>
  );
};

export default Layout;

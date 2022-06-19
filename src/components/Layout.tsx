import * as React from 'react';
import Box from '@mui/material/Box';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '70vh',
        overflow: 'hidden',
        padding: '2em',
      }}
    >
      {children}
    </Box>
  );
};

export default Layout;

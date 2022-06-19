import * as React from 'react';
import Box from '@mui/material/Box';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        padding: '5em 10em 2em 10em',
      }}
    >
      {children}
    </Box>
  );
};

export default Layout;

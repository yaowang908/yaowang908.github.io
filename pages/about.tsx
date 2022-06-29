import type { NextPage } from 'next';

import Box from '@mui/material/Box';

import Layout from 'src/components/Layout';
import ColorModeSwitcher from 'src/components/ColorModeSwitcher';
import Header from 'src/components/Header';
import NavMenu from 'src/components/NavMenu';

const About: NextPage = () => {
  return (
    <Layout>
      <NavMenu />
      <Header title='About me' />
      <Box sx={{ flexGrow: '1' }}>{/* content */}</Box>
    </Layout>
  );
};

export default About;

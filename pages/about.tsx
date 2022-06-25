import type { NextPage } from 'next';

import Box from '@mui/material/Box';

import Layout from 'src/components/Layout';
import ColorModeSwitcher from 'src/components/ColorModeSwitcher';
import Footer from 'src/components/Footer';
import Header from 'src/components/Header';

const About: NextPage = () => {
  return (
    <Layout>
      <ColorModeSwitcher />
      <Header title='About me' />
      <Box sx={{ flexGrow: '1' }}>{/* content */}</Box>
      <Footer />
    </Layout>
  );
};

export default About;

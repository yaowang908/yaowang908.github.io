import type { NextPage } from 'next';
import Head from 'next/head';

import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/material';

import Layout from 'src/components/Layout';
import ColorModeSwitcher from 'src/components/ColorModeSwitcher';
import Footer from 'src/components/Footer';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>I'm Yao</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Layout>
        <ColorModeSwitcher />
        <Typography
          align='left'
          noWrap
          variant='h1'
          fontFamily={'Montserrat'}
          sx={{
            fontWeight: '800',
            fontSize: 'clamp(14vw, 6em, 30vw)',
            marginTop: '10vh',
          }}
        >
          Hello
        </Typography>
        <Typography
          align='left'
          fontFamily={'Montserrat'}
          variant='h2'
          sx={{ fontSize: 'clamp(3vw, 3em, 3em)', marginLeft: '0.2em' }}
        >
          I'm Yao Wang.
        </Typography>
        <Typography
          align='left'
          fontFamily={'Montserrat'}
          variant='h2'
          sx={{ fontSize: 'clamp(3vw, 3em, 3em)', marginLeft: '0.2em' }}
        >
          I build things for the web.
        </Typography>
        <Footer />
      </Layout>
    </>
  );
};

export default Home;

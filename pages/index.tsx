import type { NextPage } from 'next';
import Head from 'next/head';

import { Typography } from '@mui/material';

import Layout from 'src/components/Layout';
import ColorModeSwitcher from 'src/components/ColorModeSwitcher';
import Footer from 'src/components/Footer';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Hello</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Layout>
        <ColorModeSwitcher />
        <Typography
          align='left'
          noWrap
          variant='h1'
          sx={{
            marginTop: '10vh',
          }}
        >
          Hello
        </Typography>
        <Typography align='left' variant='h2' sx={{ marginLeft: '0.2em' }}>
          I'm Yao Wang.
        </Typography>
        <Typography align='left' variant='h2' sx={{ marginLeft: '0.2em' }}>
          I build things for the web.
        </Typography>
        <Footer />
      </Layout>
    </>
  );
};

export default Home;

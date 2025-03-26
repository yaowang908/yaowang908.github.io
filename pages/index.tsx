import type { NextPage } from 'next';
import Head from 'next/head';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Layout from 'src/components/Layout';
import NavMenu from 'src/components/NavMenu';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Hello</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Layout>
        <NavMenu />
        <Box sx={{ flexGrow: '1', display: 'grid', placeItems: 'center left' }}>
          <div>
            <Typography
              align='left'
              noWrap
              variant='h1'
              sx={{
                marginTop: '-6vh',
              }}
            >
              Hello
            </Typography>
            <Typography align='left' variant='h2' sx={{ marginLeft: '0.2em' }}>
              I&apos;m Yao Wang.
            </Typography>
            <Typography align='left' variant='h2' sx={{ marginLeft: '0.2em' }}>
              I build things for the web.
            </Typography>
          </div>
        </Box>
      </Layout>
    </>
  );
};

export default Home;

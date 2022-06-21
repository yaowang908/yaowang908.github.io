import type { NextPage } from 'next';
import Head from 'next/head';

import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/material';

import Layout from 'src/components/Layout';
import ColorModeSwitcher from 'src/components/ColorModeSwitcher';
import Link from 'src/components/Link';
import { fontSize } from '@mui/system';

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
            fontSize: '12em',
          }}
        >
          Hello
        </Typography>
        <Typography
          align='left'
          fontFamily={'Montserrat'}
          variant='h2'
          sx={{ fontSize: '3em', marginLeft: '0.2em' }}
        >
          I'm Yao Wang.
        </Typography>
        <Typography
          align='left'
          fontFamily={'Montserrat'}
          variant='h2'
          sx={{ fontSize: '3em', marginLeft: '0.2em' }}
        >
          I build things for the web.
        </Typography>
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'right',
            position: 'absolute',
            right: '10em',
            bottom: '2em',
          }}
        >
          <Stack direction='row' spacing={6}>
            <Link href='/about' sx={{ fontSize: '1.6em' }}>
              ABOUT ME
            </Link>
            <Link href='/projects' sx={{ fontSize: '1.6em' }}>
              PROJECTS
            </Link>
          </Stack>
        </Container>
      </Layout>
    </>
  );
};

export default Home;

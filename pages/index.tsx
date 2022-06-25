import type { NextPage } from 'next';
import Head from 'next/head';

import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Layout from 'src/components/Layout';
import ColorModeSwitcher from 'src/components/ColorModeSwitcher';
import Link from 'src/components/Link';

const Home: NextPage = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

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
        <Container
          sx={(theme) => ({
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'right',
            position: 'absolute',
            right: '10vw',
            bottom: '2vw',
            [theme.breakpoints.down('sm')]: {
              justifyContent: 'center',
              right: '0vw',
            },
          })}
        >
          <Stack direction='row' spacing={6}>
            <Link href='/about' sx={{ fontSize: 'clamp(1.5vw, 2em, 1em)' }}>
              ABOUT ME
            </Link>
            <Link href='/projects' sx={{ fontSize: 'clamp(1.5vw, 2em, 1em)' }}>
              PROJECTS
            </Link>
          </Stack>
        </Container>
      </Layout>
    </>
  );
};

export default Home;

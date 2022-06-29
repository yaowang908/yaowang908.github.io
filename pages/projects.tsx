import type { NextPage } from 'next';
import Head from 'next/head';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Layout from 'src/components/Layout';
import ColorModeSwitcher from 'src/components/ColorModeSwitcher';
import Header from 'src/components/Header';
import Link from 'src/components/Link';
import NavMenu from 'src/components/NavMenu';

const projectsData = [
  {
    name: 'chrome-extension-newtab',
    link: 'https://github.com/yaowang908/chrome-extension-newtab',
    preview: '',
  },
  {
    name: 'time-zone-organizer',
    link: 'https://github.com/yaowang908/time-zone-organizer',
    preview: 'https://time-zone-organizer.vercel.app/',
  },
  {
    name: 'my-react-calendar',
    link: 'https://github.com/yaowang908/my-react-calendar',
    preview: 'https://yaowang908.github.io/my-react-calendar/',
  },
  {
    name: 'react-adaptable-carousel',
    link: 'https://github.com/yaowang908/react-adaptable-carousel',
    preview: 'https://yaowang908.github.io/react-adaptable-carousel/',
  },
  {
    name: '2048',
    link: 'https://github.com/yaowang908/2048',
    preview: 'https://yaowang908.github.io/2048/',
  },
];

const Projects: NextPage = () => {
  return (
    <Layout>
      <NavMenu />
      <Header title='Projects' />
      <Box
        sx={(theme) => ({
          width: '100%',
          margin: '5vw auto 0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gridAutoRows: 'minmax(150px, 6em)',
          gap: 1,
          flexGrow: '1',
          overflow: 'hidden',
          [theme.breakpoints.down('lg')]: {
            gridTemplateColumns: '1fr 1fr 1fr',
          },
          [theme.breakpoints.down('md')]: {
            gridTemplateColumns: '1fr 1fr',
          },
          [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: '1fr',
          },
        })}
      >
        {projectsData.map((p) => (
          <Paper elevation={4} key={p.name} sx={{ p: 2, maxWidth: '100%' }}>
            <Typography
              align='left'
              variant='h6'
              sx={{ fontSize: '1em', maxWidth: '100%' }}
            >
              {p.name}
            </Typography>
            <Link href={p.link} sx={{ mr: 2 }}>
              Github
            </Link>
            {p.preview && <Link href={p.preview}>Preview</Link>}
          </Paper>
        ))}
      </Box>
    </Layout>
  );
};

export default Projects;

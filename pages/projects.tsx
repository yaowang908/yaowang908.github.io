import * as React from 'react';
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

interface ProjectsData {
  name: string;
  repositoryLabel: string;
  repositoryLink: string;
  previewLabel?: string;
  previewLink?: string;
}

const convertResponseData = (responseData: any[]) => {
  return responseData?.map((p) => ({
    name: p?.properties?.Name?.title[0]?.plain_text,
    repositoryLabel:
      p?.properties?.['Repository Label']?.['rich_text'][0]?.plain_text,
    repositoryLink: p?.properties?.['Repository URL']?.url,
    previewLabel:
      p?.properties?.['Preview Label']?.['rich_text'][0]?.plain_text,
    previewLink: p?.properties?.['Preview URL']?.url,
  }));
};

const Projects: NextPage = () => {
  const [data, setData] = React.useState<ProjectsData[]>([]);
  const [error, setError] = React.useState<any>(undefined);

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch('https://royal-dawn-3c44.yaowang.workers.dev/');
      const data = await res.json();
      const formattedData = convertResponseData(data?.results);
      setData(formattedData);
    }
    try {
      fetchData();
    } catch (e) {
      console.error(e);
      setError(e);
    }
  }, []);

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
        {error && <Typography>{error + ''}</Typography>}
        {data.length > 0 &&
          !error &&
          data.map((p) => (
            <Paper elevation={4} key={p.name} sx={{ p: 2, maxWidth: '100%' }}>
              <Typography
                align='left'
                variant='h6'
                sx={{ fontSize: '1em', maxWidth: '100%' }}
              >
                {p.name}
              </Typography>
              <Link href={p?.repositoryLink} sx={{ mr: 2 }}>
                {p?.repositoryLabel}
              </Link>
              {p?.previewLink && (
                <Link href={p?.previewLink}>{p?.previewLabel}</Link>
              )}
            </Paper>
          ))}
      </Box>
    </Layout>
  );
};

export default Projects;

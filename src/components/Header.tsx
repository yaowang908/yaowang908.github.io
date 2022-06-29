import Head from 'next/head';
import Typography from '@mui/material/Typography';

const Header = ({ title }: { title: string }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Typography
        align='center'
        variant='h2'
        sx={{ marginLeft: '0.2em', flexGrow: '0' }}
      >
        {title}
      </Typography>
    </>
  );
};

export default Header;

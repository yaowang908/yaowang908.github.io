import { useRouter } from 'next/router';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ColorModeSwitcher from 'src/components/ColorModeSwitcher';
import Link from 'src/components/Link';

const footerLinkData = [
  {
    href: '/',
    text: 'HOME',
  },
  // {
  //   href: '/about',
  //   text: 'ABOUT ME',
  // },
  {
    href: '/projects',
    text: 'PROJECTS',
  },
];

const MenuItem = ({ href, text }: { href: string; text: string }) => (
  <Link href={href} noWrap sx={{ alignSelf: 'center' }}>
    <Typography
      variant='body1'
      noWrap
      sx={{ fontSize: 'clamp(1.5vw, 2em, 1.1em)' }}
    >
      {text}
    </Typography>
  </Link>
);

const NavMenu = () => {
  const router = useRouter();
  return (
    <>
      <Box
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'right',
          alignItems: 'center',
          flexGrow: '0',
          marginBottom: '2vh',
          maxWidth: '100%',
          [theme.breakpoints.down('md')]: {
            justifyContent: 'left',
          },
        })}
      >
        <Stack
          direction='row'
          spacing={{ xs: 2, sm: 3, md: 4, lg: 6 }}
          sx={{ maxWidth: '100%' }}
        >
          {footerLinkData
            .filter((x) => x.href !== router.pathname)
            .map((x) => (
              <MenuItem href={x.href} text={x.text} key={x.href} />
            ))}
          <ColorModeSwitcher />
        </Stack>
      </Box>
    </>
  );
};

export default NavMenu;

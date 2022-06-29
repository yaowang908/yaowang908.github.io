import { useRouter } from 'next/router';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import Link from 'src/components/Link';

const footerLinkData = [
  {
    href: '/',
    text: 'HOME',
  },
  {
    href: '/about',
    text: 'ABOUT ME',
  },
  {
    href: '/projects',
    text: 'PROJECTS',
  },
];

const FooterItem = ({ href, text }: { href: string; text: string }) => (
  <Link href={href} sx={{ fontSize: 'clamp(1.5vw, 2em, 1em)' }}>
    {text}
  </Link>
);

const Footer = () => {
  const router = useRouter();
  return (
    <>
      <Box
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'right',
          flexGrow: '0',
          right: '10vw',
          bottom: '2vw',
          [theme.breakpoints.down('md')]: {
            justifyContent: 'center',
            marginTop: '2vw',
            right: '0vw',
            bottom: '0vw',
          },
        })}
      >
        <Stack direction='row' spacing={6}>
          {footerLinkData
            .filter((x) => x.href !== router.pathname)
            .map((x) => (
              <FooterItem href={x.href} text={x.text} key={x.href} />
            ))}
        </Stack>
      </Box>
    </>
  );
};

export default Footer;

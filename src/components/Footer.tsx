import Stack from '@mui/material/Stack';
import { Container } from '@mui/material';
import Link from 'src/components/Link';

const footerLinkData = [
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
  return (
    <>
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
          {footerLinkData.map((x) => (
            <FooterItem href={x.href} text={x.text} key={x.href} />
          ))}
        </Stack>
      </Container>
    </>
  );
};

export default Footer;

import type { NextPage } from 'next';
import Head from 'next/head';

import Layout from 'src/components/Layout';
import ColorModeSwitcher from 'src/components/ColorModeSwitcher';
import Footer from 'src/components/Footer';

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>About me</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Layout>
        <ColorModeSwitcher />
        <Footer />
      </Layout>
    </>
  );
};

export default About;

import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from 'src/components/Layout';
import ColorModeSwitcher from 'src/components/ColorModeSwitcher';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>I'm Yao</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <ColorModeSwitcher />
      <Layout>
        <div>Item 1</div>
      </Layout>
    </>
  );
};

export default Home;

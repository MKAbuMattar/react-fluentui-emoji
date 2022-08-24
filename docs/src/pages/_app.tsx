import '@/components/Nav/App.scss';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';

import Navbar from '@/components/Nav';
import Notification from '@/components/ui/notifications';
import SEO from '@/config/next-seo.config';
import { Container,GlobalStyle } from '@/style/style';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <DefaultSeo {...SEO} />
      <GlobalStyle />
      <Notification>
        <div className="app">
          <Navbar />
          <main>
            <Container>
              <Component {...pageProps} />
            </Container>
          </main>
        </div>
      </Notification>
    </>
  );
};

export default App;

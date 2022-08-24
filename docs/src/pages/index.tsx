import DeviconsReactOriginal from 'devicons-react/lib/icons/DeviconsReactOriginal';
import type { NextPage } from 'next';
import Link from 'next/link';

import { Banner, Discreption, Installation } from '@/style/style';
import { Card, CardInfo, CardTitle } from '@/style/style';
import Highlight from '@/ui/highlight';

import ImgBanner from '@/assets/img/banner.webp';

const Home: NextPage = () => {
  const pkg = `#npm
npm install --save react-fluentui-emoji

#yarn
yarn add react-fluentui-emoji

#pnpm
pnpm add react-fluentui-emoji`;

  return (
    <>
      <section>
        <Banner>
          <DeviconsReactOriginal width={'3rem'} height={'3rem'} />
          <h1>React Fluentui Emoji</h1>
        </Banner>
        <Discreption>
          React Fluentui Emoji an npm package contains a number of well-known,
          cordial, and contemporary emoji, build into{' '}
          <Link href="https://github.com/microsoft/fluentui-emoji">
            <a target={'__blank'}>@microsoft/fluentui-emoji</a>
          </Link>
          .
        </Discreption>

        <div>
          <img src={ImgBanner.src} width={'80%'} alt="" />
        </div>
      </section>

      <Installation>
        <h2>Installation</h2>

        <Card>
          <CardInfo>
            <CardTitle>Install package</CardTitle>
          </CardInfo>
          <Highlight language={'bash'} code={pkg} />
        </Card>
      </Installation>
    </>
  );
};

export default Home;

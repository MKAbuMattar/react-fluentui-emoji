import DeviconsReactOriginal from 'devicons-react/lib/icons/DeviconsReactOriginal';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import Main from '@/components/Main';
import FlatData from '@/data/build.data.flat.json';
import { Banner, Card, CardInfo, CardTitle } from '@/style/style';
import Highlight from '@/ui/highlight';

const DynamicMain = dynamic(() => import('@/components/Main'), {
  loading: () => <Main icons={FlatData} />,
  suspense: true,
});

const Loading: NextPage = () => {
  return (
    <>
      <h1>Loading...</h1>
    </>
  );
};

const SVG: NextPage = () => {
  const code = `import IconF1stPlaceMedal from 'react-fluentui-emoji/icons/flat/IconF1stPlaceMedal';

const App = () => {
  return (
    <>
      <IconF1stPlaceMedal />
      {/* just high contrast you can change the color */}
      <IconF1stPlaceMedal size={'3rem'} />
    </>
  )
}

export default App
`;

  return (
    <>
      <Suspense fallback={<Loading />}>
        <section>
          <Banner>
            <DeviconsReactOriginal width={'3rem'} height={'3rem'} />
            <h1>
              Fluentui Emoji <span>Flat</span>
            </h1>
          </Banner>

          <Card>
            <CardInfo>
              <CardTitle>Usage</CardTitle>
            </CardInfo>
            <Highlight language={'javascript'} code={code} />
          </Card>
        </section>
        <DynamicMain icons={FlatData} type={'flat'} />
      </Suspense>
    </>
  );
};

export default SVG;

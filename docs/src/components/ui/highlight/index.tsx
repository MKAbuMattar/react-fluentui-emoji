import highlight from 'highlight.js';
import React, { FC, useEffect, useRef } from 'react';

type Props = {
  code: string;
  language: string;
};

const Index: FC<Props> = (props) => {
  const { code, language } = props;

  const refCode = useRef<HTMLElement>(null);

  useEffect(() => {
    const ref = refCode.current as HTMLElement;
    highlight.highlightElement(ref);
  }, []);

  const languageClass = (language: string) => {
    switch (language) {
      case 'bash':
        return 'language-bash';
      case 'javascript':
        return 'language-javascript';
      case 'typescript':
        return 'language-typescript';
      case 'css':
        return 'language-css';
      case 'html':
      case 'xml':
        return 'language-xml';
      default:
        return 'language-bash';
    }
  };

  return (
    <>
      <pre>
        <code className={`${languageClass(language)} hljs`} ref={refCode}>
          {code}
        </code>
      </pre>
    </>
  );
};

export default React.memo(Index);

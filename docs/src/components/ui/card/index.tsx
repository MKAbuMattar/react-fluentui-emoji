import Image from 'next/image';
import React, { FC } from 'react';

import { UseNotification } from '@/components/ui/notifications';
import Item from '@/types/item';

import { Card, CardInfo, CardTitle } from './style';

type Props = {
  item: Item;
  language: string;
  type?: 'high-contrast' | 'flat' | 'modern';
};

const index: FC<Props> = (props) => {
  const { item, language, type = 'high-contrast' } = props;

  const code = (type: 'high-contrast' | 'flat' | 'modern') => {
    switch (type) {
      case 'high-contrast':
        return `IconHC${item.name.replace(/\s/g, '')}`;
      case 'flat':
        return `IconF${item.name.replace(/\s/g, '')}`;
      case 'modern':
        return `IconM${item.name.replace(/\s/g, '')}`;
      default:
        return `IconHC${item.name.replace(/\s/g, '')}`;
    }
  };

  const dispatch = UseNotification();

  const handleNewNotification = (
    type: string,
    message: string,
    title: string,
  ) => {
    dispatch({
      type: type,
      message: message,
      title: title,
    });
  };

  const myLoader = ({ src, width, quality }: any) => {
    return `https://cdn.jsdelivr.net/npm/fluentui-emoji@1.2.1/icons/${src}?w=${width}&q=${
      quality || 75
    }`;
  };

  const copyTextToClipboard = async (text: string) => {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  };

  const handleCopyClick = () => {
    copyTextToClipboard(code(type))
      .then(() => {
        handleNewNotification('SUCCESS', 'Copied to clipboard', 'Success');
      })
      .catch((err) => {
        handleNewNotification('ERROR', err, 'Error');
        console.log(err);
      });
  };

  return (
    <>
      <Card onClick={handleCopyClick}>
        <CardInfo>
          <Image
            loader={myLoader}
            src={`${type}/${item.svg}`}
            alt={item.name}
            width={56}
            height={56}
          />
          <CardTitle>{item.name}</CardTitle>
        </CardInfo>
      </Card>
    </>
  );
};

export default React.memo(index);

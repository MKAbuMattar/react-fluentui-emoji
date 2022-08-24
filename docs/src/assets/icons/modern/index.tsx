import { FC } from 'react';

// type
import type Props from '@/types/icon';

const index: FC<Props> = (props) => {
  const { fill = 'currentColor', size = '24', ...otherProps } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 58 58"
      fill={fill}
      {...otherProps}
    >
      <g>
        <polygon style={{ fill: '#26B99A' }} points="29,58 3,45 3,13 29,26 	" />
        <polygon
          style={{ fill: '#556080' }}
          points="29,58 55,45 55,13 29,26 	"
        />
        <polygon style={{ fill: '#434C6D' }} points="3,13 28,0 55,13 29,26 	" />
      </g>
    </svg>
  );
};

export default index;

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
      viewBox="0 0 60 60"
      fill={fill}
      {...otherProps}
    >
      <g>
        <path
          d="M29,25.882l26.482-13.241L29.434,0.099c-0.284-0.137-0.615-0.132-0.895,0.014l-25,13c-0.011,0.006-0.018,0.015-0.029,0.021
		c-0.001,0.001-0.002,0.001-0.003,0.002L29,25.882z"
        />
        <path
          d="M30,27.618V60c0.138,0,0.272-0.038,0.401-0.094c0.015-0.007,0.032-0.004,0.046-0.011l26-13C56.786,46.725,57,46.379,57,46
		V14.119L30,27.618z"
        />
        <path d="M28,27.618l-25-12.5V46c0,0.379,0.214,0.725,0.553,0.895L28,59.119V27.618z" />
      </g>
    </svg>
  );
};

export default index;

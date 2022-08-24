import { FC, useEffect,useState } from 'react';
// import type of v4 from uuid
import { v4 } from 'uuid';

type Dispatch = {
  id: typeof v4;
  type: 'REMOVE_NOTIFICATION' | 'ADD_NOTIFICATION';
};

type Props = {
  dispatch: any;
  id: typeof v4;
  message: string;
  type: 'SUCCESS' | 'ERROR';
};

const Notification: FC<Props> = (props) => {
  const { id, message, type, dispatch } = props;

  const [exit, setExit] = useState(false);
  const [width, setWidth] = useState(0);
  const [intervalID, setIntervalID] = useState('');

  const handleStartTimer = () => {
    const id = setInterval(() => {
      setWidth((prev) => {
        if (prev < 100) {
          return prev + 0.5;
        }

        clearInterval(id);
        return prev;
      });
    }, 20);

    setIntervalID(id as any);
  };

  const handlePauseTimer = () => {
    clearInterval(intervalID);
  };

  const handleCloseNotification = () => {
    handlePauseTimer();
    setExit(true);
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION',
        id: id,
      });
    }, 400);
  };

  useEffect(() => {
    if (width === 100) {
      // Close notification
      handleCloseNotification();
    }
  }, [width]);

  useEffect(() => {
    handleStartTimer();
  }, []);

  return (
    <div
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleStartTimer}
      className={`notification-item ${
        type === 'SUCCESS' ? 'success' : 'error'
      } ${exit ? 'exit' : ''}`}
    >
      <p>{message}</p>
      <div className={'bar'} style={{ width: `${width}%` }} />
    </div>
  );
};

export default Notification;

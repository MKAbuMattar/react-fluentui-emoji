import { createContext, useContext, useReducer } from 'react';
import { v4 } from 'uuid';

import Notification from './Notification';

const NotificationContext = createContext({} as any);

const NotificationProvider = (props: any) => {
  const [state, dispatch] = useReducer((state: any, action: any): any => {
    switch (action.type) {
      case 'ADD_NOTIFICATION':
        return [...state, { ...action.payload }];
      case 'REMOVE_NOTIFICATION':
        return state.filter((el: any) => el.id !== action.id);
      default:
        return state;
    }
  }, []);

  return (
    <NotificationContext.Provider value={dispatch}>
      <div className={'notification-wrapper'}>
        {state.map((note: any) => {
          return <Notification dispatch={dispatch} key={note.id} {...note} />;
        })}
      </div>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const UseNotification = () => {
  const dispatch = useContext(NotificationContext);

  return (props: any) => {
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: v4(),
        ...props,
      },
    });
  };
};

export default NotificationProvider;

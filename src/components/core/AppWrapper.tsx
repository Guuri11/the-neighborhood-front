import React from 'react';

import { AppProvider } from '../../context';
import AppStore from '../../stores/app';

export type AppProps = {

}

type Props = React.PropsWithChildren<AppProps>

const AppWrapper: React.FunctionComponent<Props> = ({ children }: Props) => {
  const defaultStore = React.useRef(
    new AppStore(),
  );

  return (
    <AppProvider store={defaultStore.current}>
      {children}
    </AppProvider>
  );
};

export default AppWrapper;

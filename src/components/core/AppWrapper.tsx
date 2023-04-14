import React from "react";

import { AppProvider } from "../../context";
import AppStore from "../../stores/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

export type AppProps = {};

type Props = React.PropsWithChildren<AppProps>;

const AppWrapper: React.FunctionComponent<Props> = ({ children }: Props) => {
  const defaultStore = React.useRef(new AppStore());

  return (
    <QueryClientProvider client={client}>
      <AppProvider store={defaultStore.current}>{children}</AppProvider>
    </QueryClientProvider>
  );
};

export default AppWrapper;

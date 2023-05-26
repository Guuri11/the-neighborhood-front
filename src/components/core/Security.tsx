import { observer } from "mobx-react-lite";
import React, { useCallback, useEffect } from "react";
import { useAsyncStorage } from "../../hooks/useAsyncStorage";
import { useAuthenticationStore, useAuthorizationStore, useUIStore } from "../../hooks/store";
import Navigation from "../router/Navigation";
import LoadingPage from "../design/common/Loading";

const Security = observer(() => {
  const authorizationStore = useAuthorizationStore();
  const authenticationStore = useAuthenticationStore();
  const { getData } = useAsyncStorage();
  const uiStore = useUIStore();

  const handleShowIntro = useCallback(
    (value: string) => {
      if (value === "0") {
        authorizationStore.setShowIntro("0");
      } else {
        authorizationStore.setShowIntro("1");
      }
    },
    [authorizationStore.showIntro],
  );

  const handleFirsTime = useCallback(
    (value: string) => {
      if (value === "0") {
        authorizationStore.setIsFirstTime("0");
      } else {
        authorizationStore.setIsFirstTime("1");
      }
    },
    [authorizationStore.firstTime],
  );

  const handleToken = useCallback(
    (value: string) => {
      if (value) {
        authenticationStore.setToken(value);
        authenticationStore.getSelf();
      } else {
        authenticationStore.setIsAuthenticated(false);
      }
    },
    [authenticationStore.token],
  );

  useEffect(() => {
    Promise.all([getData("showIntro"), getData("firstTime"), getData("token")])
      .then((values) => {
        handleShowIntro(values[0]);
        handleFirsTime(values[1]);
        handleToken(values[2]);
        uiStore.loading.stopLoading();
      })
      .catch(() => {
        uiStore.notification.addNotification("Unhandled error");
      });
  }, [
    authenticationStore.isAuthenticated,
    authorizationStore.firstTime,
    authenticationStore.user?.email,
    authorizationStore.showIntro,
  ]);

  if (uiStore.loading.loading) {
    return <LoadingPage />;
  }

  return <Navigation />;
});

export default Security;

import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { removeData, storeData, useAsyncStorage } from "../../hooks/useAsyncStorage";
import LoadingPage from "../design/common/Loading";
import { useAuthenticationStore, useAuthorizationStore, useLocationStore } from "../../hooks/store";
import OnBoarding from "../router/OnBoarding/OnBoarding";
import LocationPage from "../router/LocationPage/LocationPage";
import Signup from "../router/Authentication/Signup/Signup";
import Navigation from "../router/Navigation";
import PlayerCreation from "../router/Authentication/Signup/PlayerCreation/PlayerCreation";
import SignIn from "../router/Authentication/SignIn/SignIn";

const Security = observer(() => {
  const authorizationStore = useAuthorizationStore();
  const authenticationStore = useAuthenticationStore();
  const locationStore = useLocationStore();
  const { getData } = useAsyncStorage();
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    getData("showIntro").then((value) => {
      if (value === "0") {
        authorizationStore.setShowIntro("0");
      } else {
        authorizationStore.setShowIntro("1");
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    getData("firstTime").then((value) => {
      if (value === "0") {
        authorizationStore.setIsFirstTime("0");
      } else {
        authorizationStore.setIsFirstTime("1");
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    getData("token").then((value) => {
      if (value) {
        authenticationStore.setToken(value);
        authenticationStore.getSelf();
      } else {
        authenticationStore.setIsAuthenticated(false);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  if (authorizationStore.showIntro === "1") {
    return <OnBoarding />;
  }
  
  if (authorizationStore.firstTime === "1") {
    if (!authenticationStore.user?.email) {
      return <Signup />;
    }
    return <PlayerCreation />;
  }

  if (!authenticationStore.isAuthenticated) {
    return <SignIn />
  }

  if (!locationStore.location) {
    return <LocationPage />;
  }

  return <Navigation />;
});

export default Security;

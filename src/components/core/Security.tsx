import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useAsyncStorage } from "../../hooks/useAsyncStorage";
import LoadingPage from "../design/common/Loading";
import { useAuthorizationStore, useLocationStore } from "../../hooks/store";
import OnBoarding from "../router/OnBoarding/OnBoarding";
import LocationPage from "../router/LocationPage/LocationPage";

const Security = observer(() => {
  const authorizationStore = useAuthorizationStore();
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
  }, [])

  if (loading) {
    return <LoadingPage />;
  }

  if (authorizationStore.showIntro === "1") {
    return <OnBoarding />;
  }

  if (!locationStore.location) {
    return <LocationPage />
  }

  return <LoadingPage />

})

export default Security;
import { useContext } from "react";

import { AppContext } from "../../context";
import AppStore from "../../stores/app";
import AuthenticationStore from "../../stores/app/authentication";
import AuthorizationStore from "../../stores/app/authorization";
import LocationStore from "../../stores/app/location";
import UIStore from "../../stores/app/ui";


export const useAppStore = (): AppStore => {
  const context = useContext(AppContext);
  if (context === null) {
    console.log("Use the hook inside AppProvider");
  }
  return context;
};

export const useAuthenticationStore = (): AuthenticationStore => {
  const store = useAppStore();
  return store.authenticationStore;
};

export const useAuthorizationStore = (): AuthorizationStore => {
  const store = useAppStore();
  return store.authorizationStore;
};

export const useLocationStore = (): LocationStore => {
  const store = useAppStore();
  return store.locationStore;
};

export const useUIStore = (): UIStore => {
  const store = useAppStore();
  return store.UIStore;
};

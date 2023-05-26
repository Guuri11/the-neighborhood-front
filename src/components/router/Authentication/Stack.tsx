import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "./SignIn/SignIn";
import Signup from "./Signup/Signup";
import OnBoarding from "../OnBoarding/OnBoarding";
import { observer } from "mobx-react-lite";
import { useAuthenticationStore, useAuthorizationStore, useUIStore } from "../../../hooks/store";
import PlayerCreation from "./Signup/PlayerCreation/PlayerCreation";

const Stack = createNativeStackNavigator();

type Routes = "SignIn" | "SignUp" | "OnBoarding" | "PlayerCreation";

export const AuthenticationStack = observer(() => {
  const [initialRoute, setInitialRoute] = useState<Routes>(null);
  const authenticationStore = useAuthenticationStore();
  const authorizationStore = useAuthorizationStore();

  useEffect(() => {
    if (authorizationStore.showIntro === "1") {
      setInitialRoute("OnBoarding");
    } else if (authorizationStore.firstTime === "1") {
      if (!authenticationStore.user?.email) {
        setInitialRoute("SignUp");
      } else {
        setInitialRoute("PlayerCreation");
      }
    } else if (!authenticationStore.isAuthenticated) {
      setInitialRoute("SignIn");
    }
  }, [
    authenticationStore.isAuthenticated,
    authorizationStore.firstTime,
    authenticationStore.user?.email,
    authorizationStore.showIntro,
  ]);

  if (!initialRoute) {
    return null;
  }

  return (
    <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
      <Stack.Screen name='SignIn' component={SignIn} options={{ headerShown: false }} />
      <Stack.Screen name='SignUp' component={Signup} options={{ headerShown: false }} />
      <Stack.Screen name='OnBoarding' component={OnBoarding} options={{ headerShown: false }} />
      <Stack.Screen
        name='PlayerCreation'
        component={PlayerCreation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
});

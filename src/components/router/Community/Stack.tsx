import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Community from "./Community";
import SearchPlayer from "./SearchPlayer";

const Stack = createNativeStackNavigator();

export default function CommunityStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name='Community'
        component={Community}
        options={{ title: "Community" }}
      />
      <Stack.Screen
        name='SearchPlayer'
        component={SearchPlayer}
        options={{ title: "Search" }}
      />
    </Stack.Navigator>
  );
}

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Community from "./Community";

const Stack = createNativeStackNavigator();

export default function CommunityStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name='Community'
        component={Community}
        options={{ title: "Community" }}
      />
    </Stack.Navigator>
  );
}
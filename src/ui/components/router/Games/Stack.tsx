import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Games from "./Games";

const Stack = createNativeStackNavigator();

export default function GamesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name='Games'
        component={Games}
        options={{ title: "Games" }}
      />
    </Stack.Navigator>
  );
}

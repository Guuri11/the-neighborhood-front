import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Neighborhood from "./Neighborhood";

const Stack = createNativeStackNavigator();

export default function NeighborhoodStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name='Neighborhood'
        component={Neighborhood}
        options={{ title: "Explore the Neighborhood" }}
      />
    </Stack.Navigator>
  );
}

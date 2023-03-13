import React from "react";
import AppWrapper from "./src/components/core/AppWrapper";
import { StatusBar, Text, View } from "react-native";

export default function App() {
  return (
    <AppWrapper>
      <View>
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar barStyle="default" />
      </View>
    </AppWrapper>
  );
}
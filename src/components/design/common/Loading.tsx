import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { PRIMARY_COLOR } from "../../../assets/colors";

const LoadingPage = () => {
  return (
    <View style={styles.container}>
      <Text>Logo here</Text>
      <ActivityIndicator size="large" color={PRIMARY_COLOR} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    }
})

export default LoadingPage;

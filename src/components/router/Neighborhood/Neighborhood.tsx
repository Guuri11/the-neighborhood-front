import { View, Text } from "react-native";
import React from "react";
import { Button } from "@rneui/themed";

const Neighborhood = ({ navigation }) => {
  return (
    <View>
      <Text>Neighborhood</Text>
      <Button
        title="Go to games"
        onPress={() => navigation.navigate("Games")}
      />
    </View>
  );
};

export default Neighborhood;

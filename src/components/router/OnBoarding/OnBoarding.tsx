import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { useAuthorizationStore } from "../../../hooks/store";
import Template from "../../design/layout/Template";
import BodyTemplate from "../../design/layout/BodyTemplate";
import { Image } from "@rneui/base";
import { PRIMARY_COLOR } from "../../../assets/colors";
export default function OnBoarding() {
  const authorizationStore = useAuthorizationStore();

  const slides = [
    {
      key: 1,
      title: "Welcome to your neighborhood",
      text: "your app to find and play with other basketball fans near you. 🏀",
      image: require("../../../assets/images/slider-1.png"),
      backgroundColor: "#59b2ab",
    },
    {
      key: 2,
      title: "Dominate with your friends",
      text: "Chat, invite, and join other players for games, events, or teams. Or create your own community by hosting them",
      image: require("../../../assets/images/slider-2.png"),
      backgroundColor: "#febe29",
    },
    {
      key: 3,
      title: "From rookie to hall of fame",
      text: "Track your stats, get feedback, and learn from experts. Challenge yourself and others with goals and badges.",
      image: require("../../../assets/images/slider-3.png"),
      backgroundColor: "#22bcb5",
    },
  ];

  const _renderItem = ({ item }) => {
    return (
      <Template transparent>
        <BodyTemplate>
          <View style={styles.content}>
            <Text style={styles.title}>{item.title}</Text>
              <View>
                <Image source={item.image} style={styles.image} />
              </View>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        </BodyTemplate>
      </Template>
    );
  };

  return (
    <AppIntroSlider
      keyExtractor={(item) => item.key.toString()}
      renderItem={_renderItem}
      data={slides}
      onDone={() => authorizationStore.setShowIntro("0")}
      onSkip={() => authorizationStore.setShowIntro("0")}
      activeDotStyle={{backgroundColor: PRIMARY_COLOR}}
      bottomButton
    />
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    resizeMode: "cover",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 18
  },
  title: {
    fontSize: 32,
    textAlign: "center",
    fontWeight: "700",
  },
  image: {
    width: 400,
    height: 400,
  }
});

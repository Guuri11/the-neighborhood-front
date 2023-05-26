import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { useAuthorizationStore } from "../../../hooks/store";
import { Image } from "@rneui/base";
import { PRIMARY_COLOR } from "../../../assets/colors";
import { useTranslation } from "react-i18next";
import "../../../services/locales/index";

export default function OnBoarding({navigation}) {
  const { t } = useTranslation();
  const authorizationStore = useAuthorizationStore();

  const slides = [
    {
      key: 1,
      title: t("welcome_to_your_neighborhood"),
      text: t("your_app_to_find_and_play_with_other_fans"),
      image: require("../../../assets/images/slider-1.png"),
    },
    {
      key: 2,
      title: t("dominate_with_your_friends"),
      text: t("chat_invite_join"),
      image: require("../../../assets/images/slider-2.png"),
    },
    {
      key: 3,
      title: t("from_rookie_to_hall_of_fame"),
      text: t("track_your_stats_get_feedback"),
      image: require("../../../assets/images/slider-3.png"),
    },
  ];

  const _renderItem = ({ item }) => {
    return (
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <View>
          <Image source={item.image} style={styles.image} />
        </View>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  const handleFinish = () => {
    authorizationStore.setShowIntro("0")
    navigation.navigate("SignUp");
  }

  return (
    <AppIntroSlider
      keyExtractor={(item) => item.key.toString()}
      renderItem={_renderItem}
      data={slides}
      onDone={handleFinish}
      onSkip={handleFinish}
      activeDotStyle={{ backgroundColor: PRIMARY_COLOR }}
      bottomButton
      nextLabel={t("next")}
      doneLabel={t("start_my_carreer")}
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
    margin: 10,
    marginTop: 50,
    justifyContent: "space-between",
    alignItems: "center",
    maxHeight: "80%"
  },
  text: {
    textAlign: "center",
    fontSize: 18,
  },
  title: {
    fontSize: 32,
    textAlign: "center",
    fontWeight: "700",
  },
  image: {
    width: 400,
    height: 400,
  },
});

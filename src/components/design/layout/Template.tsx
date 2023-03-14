import React, { PropsWithChildren } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  Dimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

type Props = PropsWithChildren & {
  transparent: boolean,
}

export default function Template({ transparent, children }: Props) {
  let tabBarHeight = 0;
  try {
    tabBarHeight = useBottomTabBarHeight();
  } catch (error) {
    tabBarHeight = 0;
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <View
          style={{
            ...styles.wrapper,
            backgroundColor: transparent ? "none" : "#fff",
            height: Dimensions.get("window").height - tabBarHeight,
            marginHorizontal: 20
          }}
        >
          {children}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

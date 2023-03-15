import React, { PropsWithChildren } from "react";
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type Props = PropsWithChildren & {
  transparent: boolean,
}

export default function Template({ children }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
      style={{
        ...styles.wrapper,
      }}
      >
        <View style={{ flex: 1, minHeight: "100%" }}>
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
    flex: 1,
    paddingHorizontal: 20,
  },
});

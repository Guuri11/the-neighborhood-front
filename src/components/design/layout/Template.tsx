import React, { PropsWithChildren } from "react";
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type Props = PropsWithChildren & {
  paddingFull?: boolean,
}

export default function Template({ children, paddingFull }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
      style={{
        ...styles.wrapper,
        paddingHorizontal: paddingFull ? 0 : 20
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

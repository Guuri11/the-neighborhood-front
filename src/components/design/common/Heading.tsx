import { Text } from "@rneui/base";
import React, { PropsWithChildren } from "react";
import { StyleProp, TextStyle } from "react-native";

type Props = PropsWithChildren & {
  size: 1 | 2 | 3;
  align?: "left" | "right" | "center";
  style?: StyleProp<TextStyle>;
};

export default function Heading({ children, size, style, align = "left" }: Props) {
  const fontSize = () => {
    if (size === 1) return 24;
    if (size === 2) return 20;
    if (size === 3) return 16;
  };

  const fontWeight = () => {
    if (size < 3) {
      return "bold";
    }

    return "normal";
  };

  return (
    <Text style={[{ fontSize: fontSize(), fontWeight: fontWeight(), marginVertical: 10, textAlign: align }, style]}>
      {children}
    </Text>
  );
}

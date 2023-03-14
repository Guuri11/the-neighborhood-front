import { Text } from "@rneui/base";
import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  size: 1 | 2 | 3;
};

export default function Heading({ children, size }: Props) {
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
    <Text style={{ fontSize: fontSize(), fontWeight: fontWeight(), marginVertical: 10 }}>
      {children}
    </Text>
  );
}

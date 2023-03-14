import React, { PropsWithChildren } from "react"
import { StyleSheet, View } from "react-native"

export default function BodyTemplate({children}: PropsWithChildren) {
    return (
        <View style={styles.block} >
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignSelf: "stretch",
        width: "100%",
        minHeight: "82%",
      },
})

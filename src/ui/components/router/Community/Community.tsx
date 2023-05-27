import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import Template from "../../design/layout/Template";
import { SearchBar, SpeedDial, Text } from "@rneui/themed";
import { GRAY_COLOR, PRIMARY_COLOR, SECONDARY_COLOR } from "../../../assets/colors";
import { observer } from "mobx-react-lite";

const Community = observer(({ navigation }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Template paddingFull>
        <SearchBar
          platform='default'
          containerStyle={styles.searchBarContainer}
          placeholder='Search a player...'
          placeholderTextColor={GRAY_COLOR}
          onPressIn={() => navigation.navigate("SearchPlayer")}
        />
      </Template>
      <SpeedDial
        isOpen={open}
        icon={{ name: "edit", color: "#fff" }}
        openIcon={{ name: "close", color: "#fff" }}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
        color={PRIMARY_COLOR}
      >
        <SpeedDial.Action
          icon={{ name: "photo", color: "#fff" }}
          title='Add a post'
          onPress={() => console.log("Add Something")}
          color={SECONDARY_COLOR}
        />
        <SpeedDial.Action
          icon={{ name: "comment", color: "#fff" }}
          title='Highlight'
          color={SECONDARY_COLOR}
          onPress={() => console.log("Highlight Something")}
        />
      </SpeedDial>
    </>
  );
});

const styles = StyleSheet.create({
  searchBarContainer: {
    backgroundColor: "transparent",
    borderWidth: 0, //no effect
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    borderRadius: 50,
  },
});

export default Community;

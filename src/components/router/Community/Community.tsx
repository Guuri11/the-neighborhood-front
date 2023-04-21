import { StyleSheet } from "react-native";
import React from "react";
import Template from "../../design/layout/Template";
import { SearchBar } from "@rneui/themed";
import { GRAY_COLOR } from "../../../assets/colors";

const Community = ({navigation}) => {
  return (
    <Template>
      <SearchBar
        platform='default'
        containerStyle={styles.searchBarContainer}
        placeholder='Search a player...'
        placeholderTextColor={GRAY_COLOR}
        onPressIn={() => navigation.navigate('SearchPlayer')}
      />
    </Template>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    borderWidth: 0, //no effect
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    borderRadius: 50,
  },
});


export default Community;

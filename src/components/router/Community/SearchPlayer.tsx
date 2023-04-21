import { NativeSyntheticEvent, StyleSheet, TextInputChangeEventData, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Template from "../../design/layout/Template";
import { Avatar, ListItem, SearchBar } from "@rneui/themed";
import { GRAY_COLOR } from "../../../assets/colors";
import { getPlayers } from "../../../services/api/player";
import { useAuthenticationStore, useUIStore } from "../../../hooks/store";
import { Player } from "../../../domain/Player";
import { removeSlashes } from "../../../utils/removeSlashes";

const SearchPlayer = ({ navigation }) => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [submited, setSubmited] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const authenticationStore = useAuthenticationStore();
  const uiStore = useUIStore();

  useEffect(() => {
    if (searchValue !== "") {
      setLoading(true);
      setSubmited(true);
      getPlayers(authenticationStore.token)
        .then((players) => {
          setPlayers(players);
        })
        .catch((err) => {
          console.log(err);
          uiStore.notification.addNotification("Unhandled error", "error");
        });
    }
  }, [searchValue]);

  const handleOnPress = () => {
    // TODO: Handle go to player profile
  };

  const handleOnChange = (search) => {
    setSearchValue(search);
  };
  return (
    <Template>
      <View>
        <SearchBar
          platform='default'
          containerStyle={styles.searchBarContainer}
          placeholder='Search a player...'
          placeholderTextColor={GRAY_COLOR}
          onPressIn={() => navigation.navigate("SearchPlayer")}
          onChangeText={handleOnChange}
          value={searchValue}
          onEndEditing={() => console.log("now")}
        />
      </View>
      <View>
        {players.map((player) => {
          return (
            <ListItem
              key={player.id}
              containerStyle={{ backgroundColor: null }}
              bottomDivider={player.id !== players.length - 1}
              onPress={handleOnPress}
            >
              <Avatar
                rounded
                title={Array.from(player.nickname)[0]}
                containerStyle={{ backgroundColor: "grey" }}
              />
              <ListItem.Content>
                <ListItem.Title>{player.nickname}</ListItem.Title>
                <ListItem.Subtitle>
                  {removeSlashes(player.archetype)} - {removeSlashes(player.position)}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          );
        })}
      </View>
    </Template>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    backgroundColor: "transparent",
    borderWidth: 0, //no effect
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    borderRadius: 50,
  },
});

export default SearchPlayer;

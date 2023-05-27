import { StyleSheet, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Template from "../../design/layout/Template";
import { Avatar, ListItem, SearchBar } from "@rneui/themed";
import { GRAY_COLOR } from "../../../assets/colors";
import { useAppStore, useAuthenticationStore, useUIStore } from "../../../hooks/store";
import { Player } from "../../../../domain/Player/Player";
import { removeSlashes } from "../../../../application/utils/removeSlashes";
import { observer } from "mobx-react-lite";
import { PlayerServiceType } from "../../../../application/PlayerService";
import { PlayerRepositoryI } from "../../../../domain/Player/PlayerRepository";

const SearchPlayer = observer(({ navigation }: any) => {
  const [searchValue, setSearchValue] = useState("");
  // TODO: handle loading & submitting
  const [loading, setLoading] = useState(false);
  const [submited, setSubmited] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const authenticationStore = useAuthenticationStore();
  const uiStore = useUIStore();
  const appStore = useAppStore();
  const playerService = appStore.getService("player") as {
    service: PlayerServiceType;
    repository: PlayerRepositoryI;
  };

  useEffect(() => {
    if (searchValue !== "") {
      setLoading(true);
      setSubmited(true);
      playerService.service
        .getPlayers(playerService.repository, { token: authenticationStore.token })
        .then((players) => {
          setPlayers(players);
        })
        .catch((err) => {
          console.log(err);
          uiStore.notification.addNotification("Unhandled error", "error");
        });
    }
  }, [searchValue]);

  const handleOnPress = (playerId: number) => {
    navigation.navigate("PlayerProfile", { playerId });
  };

  const handleOnChange = (search) => {
    setSearchValue(search);
  };
  return (
    <Template paddingFull>
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
              onPress={() => handleOnPress(player.id)}
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

export default SearchPlayer;

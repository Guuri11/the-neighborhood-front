import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Template from "../../design/layout/Template";
import { observer } from "mobx-react-lite";
import { getOnePlayer } from "../../../services/api/player";
import { useAuthenticationStore, useUIStore } from "../../../hooks/store";
import { Player } from "../../../domain/Player";
import { Button, Icon, Skeleton } from "@rneui/themed";
import Heading from "../../design/common/Heading";
import { removeSlashes } from "../../../utils/removeSlashes";
import { PRIMARY_COLOR } from "../../../assets/colors";
import GamesTable from "../../design/common/GamesTable";

const PlayerProfile = observer(({ route, navigation }: any) => {
  const { playerId } = route.params;
  const authenticationStore = useAuthenticationStore();
  const uiStore = useUIStore();
  const [player, setPlayer] = useState<Player>(null);

  useEffect(() => {
    getOnePlayer(authenticationStore.token, playerId)
      .then((players) => {
        setPlayer(players);
      })
      .catch((err) => {
        console.log(err);
        uiStore.notification.addNotification("Unhandled error", "error");
      });
  }, [playerId]);

  console.log(player);

  return (
    <Template>
      <View>
        <Icon
          containerStyle={{ alignItems: "flex-start" }}
          onPress={() => navigation.goBack()}
          name='arrow-back-outline'
          type='ionicon'
        />
      </View>
      {player && (
        <>
          <View style={styles.playerPersonalDataBox}>
            <Heading size={1}>{player.name}</Heading>
            {player.archetype && <Heading size={3}>{removeSlashes(player.archetype)}</Heading>}
            <View style={styles.playerFollowsBox}>
              <View>
                <Heading size={2} align='center'>
                  15
                </Heading>
                <Text>Followers</Text>
              </View>
              <View>
                <Heading size={2} align='center'>
                  15
                </Heading>
                <Text>Following</Text>
              </View>
            </View>
            <Button containerStyle={{ marginTop: 20, width: 200 }}>Follow</Button>
          </View>
          <View style={styles.playerResumeBox}>
            <Heading size={2}>Resume</Heading>
            <View style={styles.playerResumeDataBox}>
              <View>
                <Icon type='ionicon' name='stats-chart' color={PRIMARY_COLOR} />
                <Heading size={3}>PPP</Heading>
                <Text style={{ textAlign: "center" }}>12.5</Text>
              </View>
              <View>
                <Icon type='ionicon' name='star' color={PRIMARY_COLOR} />
                <Heading size={3}>Level</Heading>
                <Text style={{ textAlign: "center" }}>{authenticationStore.user.level}</Text>
              </View>
              <View>
                <Icon type='ionicon' name='trophy' color={PRIMARY_COLOR} />
                <Heading size={3}>Wins</Heading>
                <Text style={{ textAlign: "center" }}>50</Text>
              </View>
            </View>
          </View>
          <View style={styles.playerGames}>
            <Heading size={2}>Games</Heading>
            <GamesTable />
          </View>
          <View style={styles.playerPhotos}>
            <Heading size={2}>Photos</Heading>
            <Skeleton animation='pulse' width={80} height={80} />
          </View>
        </>
      )}
    </Template>
  );
});

export default PlayerProfile;

const styles = StyleSheet.create({
  playerPersonalDataBox: {
    alignItems: "center",
  },
  playerFollowsBox: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },
  playerResumeBox: {
    marginTop: 25,
  },
  playerResumeDataBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    maxWidth: "90%",
    marginLeft: "5%",
  },
  playerGames: {
    marginTop: 30,
  },
  playerPhotos: {
    marginTop: 30,
    marginBottom: 30
  },
});

import React from "react";
import Template from "../../design/layout/Template";
import Heading from "../../design/common/Heading";
import { observer } from "mobx-react-lite";
import { useAuthenticationStore } from "../../../hooks/store";
import { StyleSheet, View } from "react-native";
import { removeSlashes } from "../../../../application/utils/removeSlashes";
import { Icon, Skeleton, Text } from "@rneui/themed";
import { PRIMARY_COLOR } from "../../../assets/colors";
import GamesTable from "../../design/common/GamesTable";

const Profile = observer(() => {
  const authenticationStore = useAuthenticationStore();

  return (
    <Template>
      <View style={styles.playerPersonalDataBox}>
        <Heading size={1}>{authenticationStore.user?.name}</Heading>
        {authenticationStore.user?.archetype && (<Heading size={3}>{removeSlashes(authenticationStore.user?.archetype)}</Heading>)}
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
        <Skeleton animation='pulse' width={80} height={40} />
      </View>
    </Template>
  );
});

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
  },
});

export default Profile;

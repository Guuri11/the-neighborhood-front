import { View, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Image, Text } from "@rneui/themed";
import Heading from "../../../../../../design/common/Heading";
import * as PlayerDomain from "../../../../../../../domain/Player";
import {
  useAuthenticationStore,
  useAuthorizationStore,
  useUIStore,
} from "../../../../../../../hooks/store";
import { FormData, StepProps } from "../../PlayerCreation";
import { getArchetype, update } from "../../../../../../../services/api/player";
import { observer } from "mobx-react-lite";
import { create } from "../../../../../../../services/api/playerCareerHistory";
import { removeSlashes } from "../../../../../../../utils/removeSlashes";

export type Props = StepProps & {
  formData: FormData;
};

const Archetype = observer(({ formData }: Props) => {
  const [archetype, setArchetype] = useState<PlayerDomain.Archetype>(null);
  const [loading, setLoading] = useState(true);
  const authorizationStore = useAuthorizationStore();
  const authenticationStore = useAuthenticationStore();
  const uiStore = useUIStore();

  const updateUser = useCallback(async () => {
    authenticationStore.setUser({
      ...authenticationStore.user,
      nickname: formData.userName,
      weight: formData.weight,
      height: formData.height,
      birthdate: formData.birthDate,
      position: formData.position,
      gender: formData.gender,
    });
    try {
      const userResult = await update(authenticationStore.user, authenticationStore.token);
      if (formData.team?.length > 0) {
        const careerHistoryResult = await create(
          {
            player: { id: authenticationStore.user?.id },
            position: formData.position,
            team: formData.team,
            league: formData.league,
            pointsPerGame: formData.pointsPerGame,
            assistsPerGame: formData.assistsPerGame,
            reboundsPerGame: formData.reboundsPerGame,
            blocksPerGame: formData.blocksPerGame,
            stealsPerGame: formData.stealsPerGame,
          },
          authenticationStore.token,
        );
        if (careerHistoryResult.error) {
          uiStore.notification.addNotification(careerHistoryResult.error, "error");
        }
      }
      if (userResult.error) {
        uiStore.notification.addNotification(userResult.error, "error");
      }
      setTimeout(() => {
        getArchetype(authenticationStore.token).then((value) => {
          if (value?.error) {
            uiStore.notification.addNotification(value.error, "error");
          }
          setArchetype(value);
          setLoading(false);
        });
      }, 2500);
    } catch (error) {
      uiStore.notification.addNotification("Unhandled error", "error");
    }
  }, []);

  useEffect(() => {
    updateUser();
  }, []);

  const onSubmit = () => {
    authorizationStore.setIsFirstTime("0");
    uiStore.notification.addNotification("Congrats, you've been registered", "success");
  };

  return (
    <>
      <View style={styles.title}>
        <Heading size={1}>
          {loading && "Generating Archetype"}
          {!loading && "Archetype"}
        </Heading>
        {archetype && (<Heading size={3}>{removeSlashes(archetype)}</Heading>)}
        {!loading && (
          <ArchetypeImage gender={authenticationStore.user.gender} />
        )}
        {loading && (
          <View style={{height: 500}}>
            <Text>Analyzing your game style...</Text>
          </View>
        )}
      </View>
      <Button title='Explore the neighborhood' onPress={onSubmit} />
    </>
  );
});

type ArchetypeImageProps = {
  gender: PlayerDomain.Gender;
};

const ArchetypeImage = ({ gender }: ArchetypeImageProps) => {
  if (gender === "male") {
    return (
      <Image
        source={require("../../../../../../../assets/images/archetype-man.png")}
        style={{ width: 300, height: 500 }}
      />
    );
  }

  return (
    <Image
      source={require("../../../../../../../assets/images/archetype-woman.png")}
      style={{ width: 300, height: 500 }}
    />
  );
};

const styles = StyleSheet.create({
  title: {
    alignItems: "center",
  },
});

export default Archetype;

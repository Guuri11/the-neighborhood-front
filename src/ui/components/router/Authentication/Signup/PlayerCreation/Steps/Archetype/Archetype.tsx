import { View, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Image, Text } from "@rneui/themed";
import Heading from "../../../../../../design/common/Heading";
import * as PlayerDomain from "../../../../../../../../domain/Player/Player";
import {
  useAppStore,
  useAuthenticationStore,
  useAuthorizationStore,
  useUIStore,
} from "../../../../../../../hooks/store";
import { FormData, StepProps } from "../../PlayerCreation";
import { observer } from "mobx-react-lite";
import { removeSlashes } from "../../../../../../../../application/utils/removeSlashes";
import { PlayerServiceType } from "../../../../../../../../application/PlayerService";
import { PlayerRepositoryI } from "../../../../../../../../domain/Player/PlayerRepository";
import { CareerHistoryServiceType } from "../../../../../../../../application/CareerHistoryService";
import { CareerHistoryRepositoryI } from "../../../../../../../../domain/CareerHistory/CareerHistoryRepository";

export type Props = StepProps & {
  formData: FormData;
};

const Archetype = observer(({ formData }: Props) => {
  const [archetype, setArchetype] = useState<PlayerDomain.Archetype>(null);
  const [loading, setLoading] = useState(true);
  const authorizationStore = useAuthorizationStore();
  const authenticationStore = useAuthenticationStore();
  const uiStore = useUIStore();
  const appStore = useAppStore();
  const playerService = appStore.getService("player") as {
    service: PlayerServiceType;
    repository: PlayerRepositoryI;
  };
  const careerHistoryService = appStore.getService("careerHistory") as {
    service: CareerHistoryServiceType;
    repository: CareerHistoryRepositoryI;
  };

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
      const userResult = await playerService.service.update(
        playerService.repository,
        authenticationStore.user,
        { token: authenticationStore.token },
      );
      if (formData.team?.length > 0) {
        const careerHistoryResult = await careerHistoryService.service.create(
          careerHistoryService.repository,
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
          { token: authenticationStore.token },
        );
        if (careerHistoryResult.error) {
          uiStore.notification.addNotification(careerHistoryResult.error, "error");
        }
      }
      if (userResult.error) {
        uiStore.notification.addNotification(userResult.error, "error");
      }
      setTimeout(() => {
        playerService.service
          .getArchetype(playerService.repository, { token: authenticationStore.token })
          .then((value) => {
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
    authenticationStore.setIsAuthenticated(true);
    uiStore.notification.addNotification("Congrats, you've been registered", "success");
  };

  return (
    <>
      <View style={styles.title}>
        <Heading size={1}>
          {loading && "Generating Archetype"}
          {!loading && "Archetype"}
        </Heading>
        {archetype && <Heading size={3}>{removeSlashes(archetype)}</Heading>}
        {!loading && <ArchetypeImage gender={authenticationStore.user.gender} />}
        {loading && (
          <View style={{ height: 500 }}>
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

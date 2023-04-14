import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Image } from "@rneui/themed";
import Heading from "../../../../../../design/common/Heading";
import * as PlayerDomain from "../../../../../../../domain/Player";
import { storeData } from "../../../../../../../hooks/useAsyncStorage";
import { useAuthorizationStore } from "../../../../../../../hooks/store";
import { FormData, StepProps } from "../../PlayerCreation";

export type Props = StepProps & {
  formData: FormData;
};

const Archetype = ({ setStep }: Props) => {

  const [archetype, setArchetype] = useState<PlayerDomain.Archetype>("SLASHER")
  const [loading, setLoading] = useState(true);
  const authorizationStore = useAuthorizationStore();

  useEffect(() => {
    // TODO: replace by backend call
    setLoading(false);
  }, [])
  

  const onSubmit = (data) => {
    // TODO: send data
    authorizationStore.setIsFirstTime("0");
  };

  return (
    <>
      <View style={styles.title}>
        <Heading size={1}>
        {loading && "Generating Archetype"}
        {!loading && "Archetype"}
        </Heading>
        <Heading size={3}>{archetype}</Heading>
        {!loading && (<ArchetypeImage archetype={archetype} />)}
        {loading && (<ArchetypeImage archetype={archetype} />)}
      </View>
      <Button title='Explore the neighborhood' onPress={onSubmit} />
    </>
  );
};

type ArchetypeImageProps = {
  archetype: PlayerDomain.Archetype
}

const ArchetypeImage = ({ archetype }: ArchetypeImageProps) => {
  if (archetype === "SLASHER") {
      return <Image source={require("../../../../../../assets/images/SLASHER.png")} style={{ width: 300, height: 500 }} />
  }
}

const styles = StyleSheet.create({
  title: {
    alignItems: "center",
  },
});

export default Archetype;

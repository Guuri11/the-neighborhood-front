import { View, StyleSheet } from "react-native";
import React from "react";
import { useForm } from "react-hook-form";
import CustomInput from "../../../../../../design/common/Form/CustomInput";
import { Button, Text } from "@rneui/themed";
import Heading from "../../../../../../design/common/Heading";
import * as CareerHistoryDomain from "../../../../../../../../domain/CareerHistory/CareerHistory";
import { FormData, StepProps } from "../../PlayerCreation";

export type Props = StepProps & {
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  formData: FormData;
};

const positionValues = [
  { label: "Point Guard", value: "POINT_GUARD" },
  { label: "Shooting Guard", value: "SHOOTING_GUARD" },
  { label: "Small Forward", value: "SMALL_FORWARD" },
  { label: "Power Forward", value: "POWER_FORWARD" },
  { label: "Center", value: "CENTER" },
];

const CareerHistory = ({ setStep, setFormData, formData }: Props) => {
  const { control, handleSubmit } = useForm<CareerHistoryDomain.CareerHistory>();

  const onSubmit = (data) => {
    setFormData({
      ...formData,
      position: data.position,
      team: data.team,
      league: data.league,
      pointsPerGame: data.pointsPerGame,
      assistsPerGame: data.assistsPerGame,
      reboundsPerGame: data.reboundsPerGame,
      blocksPerGame: data.blocksPerGame,
      stealsPerGame: data.stealsPerGame,
    });
    setStep("archetype");
  };

  return (
    <>
      <View style={styles.title}>
        <Heading size={1}>Career History</Heading>
        <Text style={{ textAlign: "center" }}>Add your resume as basketball player, current & former teams played for</Text>
      </View>
      <CustomInput
        type='picker'
        label='Position'
        name='position'
        items={positionValues}
        control={control}
        placeholder='Position'
        secureTextEntry={false}
        rules={{}}
      />
      <CustomInput
        type="textInput"
        label="Team"
        name="team"
        control={control}
        placeholder="Team"
        secureTextEntry={false}
        rules={{}}
      />
      <CustomInput
        type="textInput"
        label="League"
        name="league"
        control={control}
        placeholder="League"
        secureTextEntry={false}
        rules={{}}
      />
      <CustomInput
        type="number"
        label="Points per game"
        name="pointsPerGame"
        control={control}
        placeholder="30.0"
        secureTextEntry={false}
        rules={{}}
      />
       <CustomInput
        type="number"
        label="Assists per game"
        name="assistsPerGame"
        control={control}
        placeholder="30.0"
        secureTextEntry={false}
        rules={{}}
      />
       <CustomInput
        type="textInput"
        label="Rebounds per game"
        name="reboundsPerGame"
        control={control}
        placeholder="30.0"
        secureTextEntry={false}
        rules={{}}
      />
       <CustomInput
        type="number"
        label="Steals per game"
        name="stealsPerGame"
        control={control}
        placeholder="30.0"
        secureTextEntry={false}
        rules={{}}
      />
       <CustomInput
        type="number"
        label="Blocks per game"
        name="blocksPerGame"
        control={control}
        placeholder="30.0"
        secureTextEntry={false}
        rules={{}}
      />

      <Button title='Enviar' onPress={handleSubmit(onSubmit)} />
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    alignItems: "center",
  },
});

export default CareerHistory;

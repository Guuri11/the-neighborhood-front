import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { FormData, StepProps } from "../../Signup";
import { useForm } from "react-hook-form";
import CustomInput from "../../../../../design/common/Form/CustomInput";
import { Button, Image } from "@rneui/themed";
import Heading from "../../../../../design/common/Heading";

export type BodySettingsData = {
  height: number;
  weight: number;
};

export type Props = StepProps & {
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  formData: FormData;
};

const BodySettings = ({ setStep, setFormData, formData }: Props) => {
  const { control, handleSubmit } = useForm<BodySettingsData>();

  const onSubmit = (data) => {
    // TODO: send data
    setFormData({
      ...formData,
      height: data.height,
      weight: data.weight,
    });
    setStep("career_history");
  };

  return (
    <>
      <View style={styles.title}>
        <Heading size={1}>Body Settings</Heading>
        {formData.gender === "male" && (
          <Image
            source={require(`../../../../../../assets/images/male-body.png`)}
            style={{ width: 200, height: 200 }}
          />
        )}
        {formData.gender === "female" && (
          <Image
            source={require(`../../../../../../assets/images/female-body.png`)}
            style={{ width: 200, height: 200 }}
          />
        )}
      </View>
      <CustomInput
        type='number'
        label='Height'
        name='height'
        control={control}
        placeholder='Height (cm)'
        secureTextEntry={false}
        rules={{}}
      />
      <CustomInput
        type='number'
        label='Weight'
        name='weight'
        control={control}
        placeholder='Weight (kg)'
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

export default BodySettings;

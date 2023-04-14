import React from "react";
import { Button } from "@rneui/themed";
import { useForm } from "react-hook-form";
import { Gender } from "../../../../../../../domain/Player";
import CustomInput from "../../../../../../design/common/Form/CustomInput";
import Heading from "../../../../../../design/common/Heading";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import "../../../../../../../services/locales/index";
import { FormData, StepProps } from "../../PlayerCreation";

export type VitalsData = {
  fullName: string;
  userName: string;
  birthDate: string;
  gender: Gender;
};

type Props = StepProps & {
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  formData: FormData;
};

const Vitals = ({ setStep, setFormData, formData }: Props) => {
  const { t } = useTranslation();

  const genderValues = [
    { label: t("male"), value: "male" },
    { label: t("female"), value: "female" },
    { label: t("other"), value: "other" },
  ];

  const { control, handleSubmit } = useForm<VitalsData>({
    defaultValues: { fullName: null, userName: null, gender: "male", birthDate: null },
  });

  const validateGender = (value: string) => {
    if (value === "male" || value === "female" || value === "other") {
      return true;
    }
    return false;
  };

  const onSubmit = (data) => {
    // TODO: send data
    setFormData({
      ...formData,
      fullName: data.fullName,
      userName: data.userName,
      birthDate: data.birthDate,
      gender: data.gender,
    });
    setStep("body_settings");
  };

  return (
    <>
      <View style={styles.title}>
        <Heading size={1}>{t("vitals")}</Heading>
      </View>
      <CustomInput
        type='textInput'
        label={t("fullname")}
        name='fullName'
        control={control}
        placeholder=''
        secureTextEntry={false}
        rules={{
          required: "Full name is required",
          minLength: {
            value: 3,
            message: "Full name should be at least 3 characters long",
          },
          maxLength: {
            value: 85,
            message: "Full name should be max 85 characters long",
          },
        }}
      />
      <CustomInput
        type='textInput'
        label={t('username')}
        name='userName'
        control={control}
        placeholder=''
        secureTextEntry={false}
        rules={{
          required: "Username is required",
          minLength: {
            value: 4,
            message: "Username should be at least 3 characters long",
          },
          maxLength: {
            value: 20,
            message: "Username should be max 20 characters long",
          },
        }}
      />

      <CustomInput
        type='datePicker'
        label={t('birth_date')}
        name='birthDate'
        control={control}
        placeholder='Birth Date'
        secureTextEntry={false}
        rules={{}}
      />

      <CustomInput
        type='picker'
        label={t('gender')}
        name='gender'
        control={control}
        placeholder=''
        items={genderValues}
        secureTextEntry={false}
        rules={{ required: true, validate: validateGender }}
      />

      <Button title={t("send")} onPress={handleSubmit(onSubmit)} />
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    alignItems: "center",
  },
});

export default Vitals;

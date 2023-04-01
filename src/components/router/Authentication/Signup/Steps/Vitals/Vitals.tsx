import React from "react";
import { FormData, StepProps } from "../../Signup";
import { Button } from "@rneui/themed";
import { useForm } from "react-hook-form";
import { Gender } from "../../../../../../domain/Player";
import CustomInput from "../../../../../design/common/Form/CustomInput";

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
  const {
    control,
    handleSubmit
  } = useForm<VitalsData>();

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
      gender: data.gender
    });
    setStep("body_settings");
  };

  return (
    <>
      <CustomInput
        type='textInput'
        label='Full name'
        name='fullName'
        control={control}
        placeholder='Name'
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
        label='Username'
        name='userName'
        control={control}
        placeholder='Username'
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
        label='Birth Date'
        name='birthDate'
        control={control}
        placeholder='Birth Date'
        secureTextEntry={false}
        rules={{}}
      />

      <CustomInput
        type='picker'
        label='Gender'
        name='gender'
        control={control}
        placeholder='Gender'
        secureTextEntry={false}
        rules={{ required: true, validate: validateGender }}
      />

      <Button title='Enviar' onPress={handleSubmit(onSubmit)} />
    </>
  );
};

export default Vitals;

import React, { useState } from "react";
import Template from "../../../design/layout/Template";
import { useTranslation } from "react-i18next";
import "../../../../services/locales/index";
import Heading from "../../../design/common/Heading";
import { View } from "react-native";
import CustomInput from "../../../design/common/Form/CustomInput";
import { useForm } from "react-hook-form";
import { Button, CheckBox, Text } from "@rneui/themed";
import { PRIMARY_COLOR } from "../../../../assets/colors";
import { useMutation } from "@tanstack/react-query";
import { register } from "../../../../services/api/authentication";
import { useAuthenticationStore, useUIStore } from "../../../../hooks/store";
import { RegisterResponse } from "../../../../domain/Authentication/authentication";
import { storeData } from "../../../../hooks/useAsyncStorage";

type SignUpData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup = () => {
  const { t } = useTranslation();
  const [checked, setChecked] = useState(false);
  const [showTermsAcceptedError, setshowTermsAcceptedError] = useState(false);
  const { control, handleSubmit, watch } = useForm<SignUpData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
  });
  const uiStore = useUIStore();
  const authenticationStore = useAuthenticationStore();

  const { mutate } = useMutation({
    mutationFn: register,
    onSuccess: (register) => handleOnSuccess(register),
    onError: () => {
      uiStore.notification.addNotification("Unhandled error", "error");
    },
  });

  const handleOnSuccess = async (response: RegisterResponse) => {
    if (response.status < 400) {
      authenticationStore.setToken((await response.response).token);
      authenticationStore.getSelf();
    } else {
      // TODO: handle this
      uiStore.notification.addNotification("Server error", "error");
    }
  };

  const sendData = async (data: SignUpData) => {
    if (checked) {
      mutate({ name: data.name, email: data.email.toLowerCase(), password: data.password });
      storeData("userEmail", data.email);
      storeData("userPassword", data.password);
    } else {
      setshowTermsAcceptedError(true);
    }
  };

  return (
    <Template>
      <Heading size={1} align='center'>
        {t("sign_up")}
      </Heading>
      <Heading size={3} align='center'>
        {t("enter_your_details_to_continue")}
      </Heading>
      <View style={{ marginTop: 20 }}>
        <CustomInput
          control={control}
          label={t("fullname")}
          name='name'
          rules={{
            required: t("required"),
          }}
          placeholder=''
          type='textInput'
        />
        <CustomInput
          control={control}
          label={t("email")}
          name='email'
          rules={{
            required: t("required"),
          }}
          placeholder='username@domain.com'
          type='email'
        />
        <CustomInput
          control={control}
          label={t("password")}
          name='password'
          rules={{
            required: t("required"),
            min: 6,
          }}
          type='textInput'
          secureTextEntry
        />
        <CustomInput
          control={control}
          label={t("confirm_password")}
          name='confirmPassword'
          rules={{
            required: t("required"),
            min: 6,
            validate: (value) => value === watch("password") || "The passwords do not match",
          }}
          type='textInput'
          secureTextEntry
        />
        {showTermsAcceptedError && <Text style={{ color: "red" }}>{t("required")}</Text>}
        <CheckBox
          title={t("accept_terms")}
          checked={checked}
          onPress={() => setChecked(!checked)}
          checkedColor={PRIMARY_COLOR}
        />
        <Button onPress={handleSubmit(sendData)}>{t("send")}</Button>
      </View>
    </Template>
  );
};

export default Signup;

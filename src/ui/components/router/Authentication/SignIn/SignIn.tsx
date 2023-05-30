import { View } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import "../../../../../infrastructure/locales/index";
import { useAppStore, useAuthenticationStore, useUIStore } from "../../../../hooks/store";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { AuthenticationResponse } from "../../../../../domain/Authentication/authentication";
import Template from "../../../design/layout/Template";
import Heading from "../../../design/common/Heading";
import CustomInput from "../../../design/common/Form/CustomInput";
import { Button } from "@rneui/base";
import {
  AuthenticationServiceType,
} from "../../../../../application/AuthenticationService";
import { AuthenticationRepositoryI } from "../../../../../domain/Authentication/AuthenticationRepository";

type SignInData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const appStore = useAppStore();
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm<SignInData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const uiStore = useUIStore();
  const authenticationStore = useAuthenticationStore();
  const { service, repository } = appStore.getService("authentication") as {
    service: AuthenticationServiceType;
    repository: AuthenticationRepositoryI;
  };
  const { mutate } = useMutation({
    mutationFn: (data: SignInData) => service.login(repository, data),
    onSuccess: (authenticationResponse) => handleOnSuccess(authenticationResponse),
    onError: (e) => {
      console.log(e);
      uiStore.notification.addNotification("Unhandled error", "error");
    },
  });

  const sendData = async (data: SignInData) => {
    mutate({ email: data.email.toLowerCase(), password: data.password });
  };

  const handleOnSuccess = async (authenticationResponse: AuthenticationResponse) => {
    if (authenticationResponse.status === 400) {
      uiStore.notification.addNotification("Bad credentials", "error");
      return;
    }
    const { token } = await authenticationResponse.response;
    if (token) {
      authenticationStore.setToken(token);
      authenticationStore.getSelf();
    } else {
      uiStore.notification.addNotification("Unhandled error", "error");
    }
  };
  return (
    <Template>
      <Heading size={1} align='center'>
        {t("sign_in")}
      </Heading>
      <Heading size={3} align='center'>
        {t("welcome_back")}
      </Heading>
      <View style={{ marginTop: 20 }}>
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
        <Button onPress={handleSubmit(sendData)}>{t("send")}</Button>
      </View>
    </Template>
  );
};

export default SignIn;

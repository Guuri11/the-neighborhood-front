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
    defaultValues: { name: null, email: null, password: null, confirmPassword: null },
  });

  const sendData = (data: SignUpData) => {
    if (checked) {
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

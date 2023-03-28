import React from "react";
import { View } from "react-native";
import Template from "../../design/layout/Template";
import Heading from "../../design/common/Heading";
import { StyleSheet } from "react-native";
import ImagePicker from "../../design/common/ImagePicker";
import { Button, Input } from "@rneui/base";
import CustomPicker from "../../design/common/Picker";
import DateTimePicker from "@react-native-community/datetimepicker";

const genderItems = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

const SignUp = () => {
  return (
    <Template transparent>
      <View style={styles.titleAndImagePicker}>
        <Heading size={1}>Vitals</Heading>
        <ImagePicker />
      </View>
      <View style={styles.formContainer}>
        <Heading size={2}>Full name *</Heading>
        <Input placeholder='Name surname' />
        <Heading size={2}>Username *</Heading>
        <Input placeholder='Create your username' />
        <Heading size={2}>Birthday</Heading>
        <DateTimePicker value={new Date()} mode="date" display='default' onChange={() => {}} />
        <Heading size={2}>Gender</Heading>
        <CustomPicker
          items={genderItems}
          selectedValue={genderItems[0]}
          onValueChange={() => {}}
          style={{}}
        />
        <Button>Next</Button>
      </View>
    </Template>
  );
};

const styles = StyleSheet.create({
  titleAndImagePicker: {
    alignItems: "center",
  },
  formContainer: {
    marginTop: 30,
  },
});

export default SignUp;

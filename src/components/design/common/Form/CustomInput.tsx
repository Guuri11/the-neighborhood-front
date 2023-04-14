import React from "react";
import { KeyboardTypeOptions, Text } from "react-native";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import { Input } from "@rneui/themed";
import Heading from "../Heading";
import DatePicker from "./DatePicker";
import CustomPicker from "../Picker";

type Props = {
  rules: Omit<
    RegisterOptions<any, any>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  control: Control<any>;
  name: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  label: string;
  type: "textInput" | "picker" | "datePicker" | "number" | "email";
  items?: any[]
};

const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  label,
  type,
  items,
}: Props) => {
  const getKeybordType = (): KeyboardTypeOptions => {
    if (type === "number") {
      return "numeric";
    }
    if (type === "email") {
      return "email-address";
    }
    return "default";
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
          <Heading size={2}>{label}</Heading>
          {(type === "textInput" || type === "number" ||  type === "email") && (
            <Input
              value={value}
              onChangeText={onChange}
              keyboardType={getKeybordType()}
              onBlur={onBlur}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
            />
          )}

          {type === "datePicker" && (
            <DatePicker onBlur={onBlur} label={label} onChange={onChange} />
          )}

          {type === "picker" && (
            <CustomPicker
              style={{}}
              onValueChange={onChange}
              items={items}
              selectedValue={value}
              label={label}
            />
          )}

          {error && (
            <Text style={{ color: "red", alignSelf: "stretch" }}>{error.message || "Error"}</Text>
          )}
        </>
      )}
    />
  );
};

export default CustomInput;

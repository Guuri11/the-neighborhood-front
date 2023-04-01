import { View, Text } from "react-native";
import React, { useState } from "react";
import Template from "../../../design/layout/Template";
import Vitals, { VitalsData } from "./Steps/Vitals/Vitals";
import BodySettings, { BodySettingsData } from "./Steps/BodySettings/BodySettings";

export type Steps = "vitals" | "body_settings" | "career_history" | "archetype";
export type StepProps = {
  setStep: React.Dispatch<React.SetStateAction<Steps>>;
};

export type FormData = VitalsData & BodySettingsData;
// todo add step back
const Signup = () => {
  const [step, setStep] = useState<Steps>("vitals");
  const [formData, setFormData] = useState<FormData>();
  return (
    <Template transparent>
        {step === "vitals" && <Vitals formData={formData} setFormData={setFormData} setStep={setStep} />}
        {step === "body_settings" && <BodySettings formData={formData} setFormData={setFormData} setStep={setStep} />}
    </Template>
  );
};

export default Signup;

import { View, Text } from "react-native";
import React, { useState } from "react";
import Template from "../../../design/layout/Template";
import Vitals from "./Steps/Vitals/Vitals";

export type Steps = "vitals" | "body_settings" | "career_history" | "archetype";

const Signup = () => {
  const [step, setStep] = useState<Steps>("vitals");
  return (
    <Template transparent>
        {step === "vitals" && <Vitals setStep={setStep} />}
    </Template>
  );
};

export default Signup;

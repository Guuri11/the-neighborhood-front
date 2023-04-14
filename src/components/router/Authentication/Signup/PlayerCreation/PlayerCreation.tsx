import React, { useState } from "react";
import Vitals, { VitalsData } from "./Steps/Vitals/Vitals";
import BodySettings, { BodySettingsData } from "./Steps/BodySettings/BodySettings";
import Template from "../../../../design/layout/Template";
import CareerHistory from "./Steps/CareerHistory/CareerHistory";
import Archetype from "./Steps/Archetype/Archetype";

export type Steps = "vitals" | "body_settings" | "career_history" | "archetype";
export type StepProps = {
  setStep: React.Dispatch<React.SetStateAction<Steps>>;
};

export type FormData = VitalsData & BodySettingsData;
// TODO: add step back
const PlayerCreation = () => {
  const [step, setStep] = useState<Steps>("vitals");
  const [formData, setFormData] = useState<FormData>();
  return (
    <Template>
        {step === "vitals" && <Vitals formData={formData} setFormData={setFormData} setStep={setStep} />}
        {step === "body_settings" && <BodySettings formData={formData} setFormData={setFormData} setStep={setStep} />}
        {step === "career_history" && <CareerHistory formData={formData} setFormData={setFormData} setStep={setStep} />}
        {step === "archetype" && <Archetype formData={formData} setStep={setStep} />}
    </Template>
  );
};

export default PlayerCreation;

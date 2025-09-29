import React, { useState } from "react";
import {
  Step1BasicInfo,
  Step2LocationDetails,
  Step3VolunteerNeeds,
  Step4ProfileDescription,
} from "./signup/HostelSignupFlow/index";

interface HostelSignupFlowProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

export function HostelSignupFlow({
  onComplete,
  onBack,
}: HostelSignupFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({});

  const handleNext = (data: any) => {
    setFormData({ ...formData, ...data });
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep === 1) {
      onBack();
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = (data: any) => {
    const finalData = { ...formData, ...data };
    onComplete(finalData);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {currentStep === 1 && (
        <Step1BasicInfo onNext={handleNext} onBack={handleBack} />
      )}
      {currentStep === 2 && (
        <Step2LocationDetails onNext={handleNext} onBack={handleBack} />
      )}
      {currentStep === 3 && (
        <Step3VolunteerNeeds onNext={handleNext} onBack={handleBack} />
      )}
      {currentStep === 4 && (
        <Step4ProfileDescription
          onComplete={handleComplete}
          onBack={handleBack}
        />
      )}
    </div>
  );
}

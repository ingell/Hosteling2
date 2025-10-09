import React from "react";
import { ContactPage as ContactPageComponent } from "../../../components/pages/static/ContactPage";

export const ContactPage: React.FC = () => {
  const handleBack = () => {
    window.history.back();
  };

  return <ContactPageComponent onBack={handleBack} />;
};

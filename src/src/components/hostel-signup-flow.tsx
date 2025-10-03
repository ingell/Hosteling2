import React from "react";

interface HostelSignupFlowProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

export const HostelSignupFlow: React.FC<HostelSignupFlowProps> = ({
  onComplete,
  onBack,
}) => {
  const handleSubmit = () => {
    const data = {
      /* Collect hostel signup data here */
    };
    onComplete(data);
  };

  return (
    <div>
      <h2>Hostel Signup</h2>
      {/* Add form fields for hostel signup */}
      <button onClick={handleSubmit}>Complete Signup</button>
      <button onClick={onBack}>Back</button>
    </div>
  );
};

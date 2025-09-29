import React, { useState } from "react";
import { Button } from "../../ui/button";

interface Step3VolunteerNeedsProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

export function Step3VolunteerNeeds({
  onNext,
  onBack,
}: Step3VolunteerNeedsProps) {
  const [formData, setFormData] = useState({
    volunteerRoles: "",
    workHoursPerDay: "",
    minimumStay: "",
    maximumStay: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onNext(formData);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Step 3: Volunteer Needs</h2>
      <div className="space-y-4">
        <input
          type="text"
          name="volunteerRoles"
          placeholder="Volunteer Roles (e.g., Reception, Cleaning)"
          value={formData.volunteerRoles}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="workHoursPerDay"
          placeholder="Work Hours Per Day (e.g., 4-5 hours)"
          value={formData.workHoursPerDay}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="minimumStay"
          placeholder="Minimum Stay (e.g., 2 weeks)"
          value={formData.minimumStay}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="maximumStay"
          placeholder="Maximum Stay (e.g., 3 months)"
          value={formData.maximumStay}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleSubmit}>Next</Button>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Button } from "../../ui/button";

interface Step1BasicInfoProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

export function Step1BasicInfo({ onNext, onBack }: Step1BasicInfoProps) {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    contactName: "",
    email: "",
    phone: "",
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
      <h2 className="text-2xl font-bold">Step 1: Basic Information</h2>
      <div className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Hostel Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="type"
          placeholder="Hostel Type (e.g., Backpacker Hostel)"
          value={formData.type}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="contactName"
          placeholder="Contact Name"
          value={formData.contactName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
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

import React, { useState } from "react";
import { Button } from "../../ui/button";

interface Step2LocationDetailsProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

export function Step2LocationDetails({
  onNext,
  onBack,
}: Step2LocationDetailsProps) {
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    country: "",
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
      <h2 className="text-2xl font-bold">Step 2: Location Details</h2>
      <div className="space-y-4">
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
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

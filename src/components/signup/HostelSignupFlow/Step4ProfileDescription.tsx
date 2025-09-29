import React, { useState } from "react";
import { Button } from "../../ui/button";

interface Step4ProfileDescriptionProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

export function Step4ProfileDescription({
  onComplete,
  onBack,
}: Step4ProfileDescriptionProps) {
  const [formData, setFormData] = useState({
    description: "",
    amenities: "",
    languages: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onComplete(formData);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Step 4: Profile Description</h2>
      <div className="space-y-4">
        <textarea
          name="description"
          placeholder="Hostel Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded h-32"
        />
        <input
          type="text"
          name="amenities"
          placeholder="Amenities (e.g., Free WiFi, Breakfast)"
          value={formData.amenities}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="languages"
          placeholder="Languages Spoken (e.g., English, Spanish)"
          value={formData.languages}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleSubmit}>Complete</Button>
      </div>
    </div>
  );
}

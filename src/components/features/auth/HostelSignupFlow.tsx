import React, { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Checkbox } from "../../ui/checkbox";
import { Textarea } from "../../ui/textarea";
import { Badge } from "../../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Progress } from "../../ui/progress";
import { Switch } from "../../ui/switch";
import { ImageWithFallback } from "../../figma/ImageWithFallback";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, MapPin, Star, Upload, Plus, X } from "lucide-react";
import hostelOptions from "../../../data/hostel-options.json";

interface HostelSignupData {
  // Step 1 - Basic Information
  hostelName: string;
  contactFirstName: string;
  contactLastName: string;
  email: string;
  password: string;
  phone: string;
  
  // Step 2 - Location & Details
  country: string;
  city: string;
  address: string;
  hostelType: string;
  totalBeds: string;
  establishedYear: string;
  
  // Step 3 - Volunteer Needs
  volunteerRoles: string[];
  accommodationType: string;
  mealsIncluded: boolean;
  wifiIncluded: boolean;
  workHoursPerDay: string;
  minimumStay: string;
  maximumStay: string;
  
  // Step 4 - Profile & Description
  description: string;
  amenities: string[];
  languages: string[];
  photos: string[];
}

const initialData: HostelSignupData = {
  hostelName: "",
  contactFirstName: "",
  contactLastName: "",
  email: "",
  password: "",
  phone: "",
  country: "",
  city: "",
  address: "",
  hostelType: "",
  totalBeds: "",
  establishedYear: "",
  volunteerRoles: [],
  accommodationType: "",
  mealsIncluded: false,
  wifiIncluded: true,
  workHoursPerDay: "",
  minimumStay: "",
  maximumStay: "",
  description: "",
  amenities: [],
  languages: [],
  photos: []
};

interface HostelSignupFlowProps {
  onComplete: (data: HostelSignupData) => void;
  onBack: () => void;
}

export function HostelSignupFlow({ onComplete, onBack }: HostelSignupFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<HostelSignupData>(initialData);

  const updateData = (updates: Partial<HostelSignupData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(data);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const toggleItem = (item: string, field: 'volunteerRoles' | 'amenities' | 'languages') => {
    const currentArray = data[field] as string[];
    const newArray = currentArray.includes(item)
      ? currentArray.filter(i => i !== item)
      : [...currentArray, item];
    updateData({ [field]: newArray });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return data.hostelName && data.contactFirstName && data.contactLastName && data.email && data.password;
      case 2:
        return data.country && data.city && data.address && data.hostelType;
      case 3:
        return data.volunteerRoles.length > 0 && data.accommodationType && data.workHoursPerDay;
      case 4:
        return data.description.length > 50;
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h2>Tell us about your hostel</h2>
              <p className="text-muted-foreground">
                Let's start with the basic information about your hostel and contact details.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="hostelName">Hostel Name *</Label>
                <Input
                  id="hostelName"
                  value={data.hostelName}
                  onChange={(e) => updateData({ hostelName: e.target.value })}
                  placeholder="Amazing Backpackers Hostel"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactFirstName">Contact First Name *</Label>
                  <Input
                    id="contactFirstName"
                    value={data.contactFirstName}
                    onChange={(e) => updateData({ contactFirstName: e.target.value })}
                    placeholder="John"
                  />
                </div>
                <div>
                  <Label htmlFor="contactLastName">Contact Last Name *</Label>
                  <Input
                    id="contactLastName"
                    value={data.contactLastName}
                    onChange={(e) => updateData({ contactLastName: e.target.value })}
                    placeholder="Smith"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={data.email}
                  onChange={(e) => updateData({ email: e.target.value })}
                  placeholder="info@amazingbackpackers.com"
                />
              </div>

              <div>
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  value={data.password}
                  onChange={(e) => updateData({ password: e.target.value })}
                  placeholder="Create a secure password"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={data.phone}
                  onChange={(e) => updateData({ phone: e.target.value })}
                  placeholder="+1 555 123 4567"
                />
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h2>Location & hostel details</h2>
              <p className="text-muted-foreground">
                Where is your hostel located and what type of accommodation do you offer?
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="country">Country *</Label>
                <Select value={data.country} onValueChange={(value) => updateData({ country: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    {hostelOptions.countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={data.city}
                  onChange={(e) => updateData({ city: e.target.value })}
                  placeholder="Bangkok"
                />
              </div>

              <div>
                <Label htmlFor="address">Full Address *</Label>
                <Textarea
                  id="address"
                  value={data.address}
                  onChange={(e) => updateData({ address: e.target.value })}
                  placeholder="123 Backpacker Street, Khao San Road..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="hostelType">Hostel Type *</Label>
                <Select value={data.hostelType} onValueChange={(value) => updateData({ hostelType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="What type of hostel is it?" />
                  </SelectTrigger>
                  <SelectContent>
                    {hostelOptions.hostelTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="totalBeds">Total Beds</Label>
                  <Input
                    id="totalBeds"
                    value={data.totalBeds}
                    onChange={(e) => updateData({ totalBeds: e.target.value })}
                    placeholder="50"
                  />
                </div>
                <div>
                  <Label htmlFor="establishedYear">Established Year</Label>
                  <Input
                    id="establishedYear"
                    value={data.establishedYear}
                    onChange={(e) => updateData({ establishedYear: e.target.value })}
                    placeholder="2015"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h2>Volunteer requirements</h2>
              <p className="text-muted-foreground">
                What kind of help do you need and what can you offer volunteers in return?
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <Label>Volunteer Roles Needed *</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Select all the tasks volunteers can help with
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {hostelOptions.volunteerRoles.map((role) => (
                    <div key={role} className="flex items-center space-x-2">
                      <Checkbox
                        id={role}
                        checked={data.volunteerRoles.includes(role)}
                        onCheckedChange={() => toggleItem(role, 'volunteerRoles')}
                      />
                      <Label htmlFor={role} className="text-sm">
                        {role}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="accommodationType">Accommodation Type *</Label>
                <Select value={data.accommodationType} onValueChange={(value) => updateData({ accommodationType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="What accommodation do you provide?" />
                  </SelectTrigger>
                  <SelectContent>
                    {hostelOptions.accommodationTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="mealsIncluded">Meals Included</Label>
                    <p className="text-sm text-muted-foreground">Do you provide meals for volunteers?</p>
                  </div>
                  <Switch
                    id="mealsIncluded"
                    checked={data.mealsIncluded}
                    onCheckedChange={(checked) => updateData({ mealsIncluded: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="wifiIncluded">Free WiFi</Label>
                    <p className="text-sm text-muted-foreground">Free internet access for volunteers</p>
                  </div>
                  <Switch
                    id="wifiIncluded"
                    checked={data.wifiIncluded}
                    onCheckedChange={(checked) => updateData({ wifiIncluded: checked })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="workHoursPerDay">Work Hours/Day *</Label>
                  <Select value={data.workHoursPerDay} onValueChange={(value) => updateData({ workHoursPerDay: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Hours" />
                    </SelectTrigger>
                    <SelectContent>
                      {hostelOptions.workHours.map((hours) => (
                        <SelectItem key={hours.value} value={hours.value}>
                          {hours.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="minimumStay">Minimum Stay</Label>
                  <Select value={data.minimumStay} onValueChange={(value) => updateData({ minimumStay: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Min" />
                    </SelectTrigger>
                    <SelectContent>
                      {hostelOptions.stayDurations.minimum.map((duration) => (
                        <SelectItem key={duration.value} value={duration.value}>
                          {duration.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="maximumStay">Maximum Stay</Label>
                  <Select value={data.maximumStay} onValueChange={(value) => updateData({ maximumStay: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Max" />
                    </SelectTrigger>
                    <SelectContent>
                      {hostelOptions.stayDurations.maximum.map((duration) => (
                        <SelectItem key={duration.value} value={duration.value}>
                          {duration.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h2>Complete your profile</h2>
              <p className="text-muted-foreground">
                Tell volunteers more about your hostel to attract the right people.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="description">Hostel Description *</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Describe your hostel, atmosphere, and what makes it special (minimum 50 characters)
                </p>
                <Textarea
                  id="description"
                  value={data.description}
                  onChange={(e) => updateData({ description: e.target.value })}
                  placeholder="Welcome to our vibrant backpacker hostel! We're located in the heart of the city, just minutes from all major attractions. Our friendly atmosphere and helpful staff make it the perfect base for exploring..."
                  rows={4}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {data.description.length}/50 characters minimum
                </p>
              </div>

              <div>
                <Label>Amenities & Facilities</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Select all amenities your hostel offers
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {hostelOptions.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox
                        id={amenity}
                        checked={data.amenities.includes(amenity)}
                        onCheckedChange={() => toggleItem(amenity, 'amenities')}
                      />
                      <Label htmlFor={amenity} className="text-sm">
                        {amenity}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Languages Spoken by Staff</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  What languages can your team communicate in?
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {hostelOptions.languages.map((language) => (
                    <div key={language} className="flex items-center space-x-2">
                      <Checkbox
                        id={language}
                        checked={data.languages.includes(language)}
                        onCheckedChange={() => toggleItem(language, 'languages')}
                      />
                      <Label htmlFor={language} className="text-sm">
                        {language}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Photos</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Add photos of your hostel (optional)
                </p>
                <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload photos or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    JPG, PNG up to 5MB each
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b p-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={prevStep}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex-1 mx-4">
            <Progress value={(currentStep / 4) * 100} className="h-2" />
          </div>
          <span className="text-sm text-muted-foreground">{currentStep}/4</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        <div className="max-w-md mx-auto">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t p-4">
        <div className="max-w-md mx-auto">
          <Button 
            className="w-full" 
            onClick={nextStep}
            disabled={!canProceed()}
          >
            {currentStep === 4 ? "Complete Registration" : "Continue"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
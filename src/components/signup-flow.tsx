import { useState } from "react";
import * as React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Calendar as CalendarIcon,
  MapPin,
  Star,
  ChevronDown,
} from "lucide-react";
import { format } from "date-fns";

interface SignupData {
  // Step 1
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  // Step 2
  country: string;
  city: string;

  // Step 3
  skills: string[];
  languages: string[];
  availability: {
    from: Date | undefined;
    to: Date | undefined;
  };
  experience: string;
  bio: string;
  commitment: string;
}

const initialData: SignupData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  country: "",
  city: "",
  skills: [],
  languages: [],
  availability: {
    from: undefined,
    to: undefined,
  },
  experience: "",
  bio: "",
  commitment: "",
};

const skillOptions = [
  "Reception",
  "Cleaning",
  "Maintenance",
  "Kitchen",
  "Bar help",
  "Housekeeping",
  "Social media",
  "Marketing",
  "Photography",
  "Tours",
  "Events",
  "Teaching",
  "Web design",
  "Gardening",
  "Pet care",
  "Administration",
];

const languageOptions = [
  "English",
  "Spanish",
  "Portuguese",
  "French",
  "German",
  "Italian",
  "Dutch",
  "Chinese",
  "Japanese",
  "Korean",
  "Thai",
  "Vietnamese",
];

const countries = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Netherlands",
  "Brazil",
  "Argentina",
  "Thailand",
  "Vietnam",
  "Japan",
  "South Korea",
  "Other",
];

interface SignupFlowProps {
  onComplete: (data: SignupData) => void;
  onBack: () => void;
}

export function SignupFlow({ onComplete, onBack }: SignupFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<SignupData>(initialData);

  const updateData = (updates: Partial<SignupData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onComplete(data);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      onBack();
    }
  };

  const toggleSkill = (skill: string) => {
    const newSkills = data.skills.includes(skill)
      ? data.skills.filter((s) => s !== skill)
      : [...data.skills, skill];
    updateData({ skills: newSkills });
  };

  const toggleLanguage = (language: string) => {
    const newLanguages = data.languages.includes(language)
      ? data.languages.filter((l) => l !== language)
      : [...data.languages, language];
    updateData({ languages: newLanguages });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return data.firstName && data.lastName && data.email && data.password;
      case 2:
        return data.country && data.city;
      case 3:
        return data.skills.length > 0 && data.languages.length > 0;
      default:
        return true;
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
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center space-y-2">
                  <h1>Sign up to start exploring!</h1>
                  <p className="text-muted-foreground">
                    Create your account and join thousands of volunteers around
                    the world.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First name</Label>
                      <Input
                        id="firstName"
                        value={data.firstName}
                        onChange={(e) =>
                          updateData({ firstName: e.target.value })
                        }
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input
                        id="lastName"
                        value={data.lastName}
                        onChange={(e) =>
                          updateData({ lastName: e.target.value })
                        }
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={data.email}
                      onChange={(e) => updateData({ email: e.target.value })}
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={data.password}
                      onChange={(e) => updateData({ password: e.target.value })}
                      placeholder="Create a strong password"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center space-y-2">
                  <h1>Where are you from?</h1>
                  <p className="text-muted-foreground">
                    This helps hostels understand your background and makes it
                    easier to connect.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select
                      value={data.country}
                      onValueChange={(value) => updateData({ country: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={data.city}
                      onChange={(e) => updateData({ city: e.target.value })}
                      placeholder="Enter your city"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center space-y-2">
                  <h1>Skills and availability</h1>
                  <p className="text-muted-foreground">
                    Tell us about your skills and when you're available to
                    volunteer.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Skills */}
                  <div className="space-y-3">
                    <Label>What skills do you have?</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {skillOptions.map((skill) => (
                        <Button
                          key={skill}
                          variant={
                            data.skills.includes(skill) ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => toggleSkill(skill)}
                          className="justify-start text-xs h-8"
                        >
                          {skill}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="space-y-3">
                    <Label>Languages you speak</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {languageOptions.map((language) => (
                        <Button
                          key={language}
                          variant={
                            data.languages.includes(language)
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() => toggleLanguage(language)}
                          className="justify-start text-xs h-8"
                        >
                          {language}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="space-y-3">
                    <Label>When are you available?</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="justify-start text-left"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {data.availability.from
                              ? format(data.availability.from, "MMM dd")
                              : "From"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={data.availability.from}
                            onSelect={(date) =>
                              updateData({
                                availability: {
                                  ...data.availability,
                                  from: date,
                                },
                              })
                            }
                          />
                        </PopoverContent>
                      </Popover>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="justify-start text-left"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {data.availability.to
                              ? format(data.availability.to, "MMM dd")
                              : "To"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={data.availability.to}
                            onSelect={(date) =>
                              updateData({
                                availability: {
                                  ...data.availability,
                                  to: date,
                                },
                              })
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="space-y-2">
                    <Label htmlFor="experience">
                      Previous volunteering experience (optional)
                    </Label>
                    <Textarea
                      id="experience"
                      value={data.experience}
                      onChange={(e) =>
                        updateData({ experience: e.target.value })
                      }
                      placeholder="Tell us about any previous volunteering experience..."
                      rows={3}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mx-auto flex items-center justify-center">
                    <span className="text-2xl">✓</span>
                  </div>
                  <div>
                    <h1>Welcome to VolunteerStay!</h1>
                    <p className="text-muted-foreground">
                      Your profile is complete. Start browsing volunteer
                      opportunities now.
                    </p>
                  </div>
                </div>

                {/* Profile Preview */}
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-16 h-16">
                          <AvatarFallback>
                            {data.firstName[0]}
                            {data.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3>
                            {data.firstName} {data.lastName}
                          </h3>
                          <p className="text-muted-foreground flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {data.city}, {data.country}
                          </p>
                          <div className="flex items-center mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className="w-4 h-4 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                            <span className="ml-2 text-sm text-muted-foreground">
                              New member
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm">Skills</Label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {data.skills.slice(0, 4).map((skill) => (
                              <Badge
                                key={skill}
                                variant="secondary"
                                className="text-xs"
                              >
                                {skill}
                              </Badge>
                            ))}
                            {data.skills.length > 4 && (
                              <Badge variant="outline" className="text-xs">
                                +{data.skills.length - 4} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm">Languages</Label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {data.languages.slice(0, 3).map((language) => (
                              <Badge
                                key={language}
                                variant="outline"
                                className="text-xs"
                              >
                                {language}
                              </Badge>
                            ))}
                            {data.languages.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{data.languages.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        {data.availability.from && data.availability.to && (
                          <div>
                            <Label className="text-sm">Available</Label>
                            <p className="text-sm text-muted-foreground mt-1">
                              {format(data.availability.from, "MMM dd")} -{" "}
                              {format(data.availability.to, "MMM dd")}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Button */}
      <div className="p-4 border-t">
        <div className="max-w-md mx-auto">
          <Button
            onClick={nextStep}
            disabled={!canProceed()}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black h-12"
          >
            {currentStep === 4 ? "Start exploring" : "Continue"}
            {currentStep < 4 && <ArrowRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </div>
    </div>
  );
}

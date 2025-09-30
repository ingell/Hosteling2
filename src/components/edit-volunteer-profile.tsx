import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { LocalStorageManager, UserData } from "./utils/local-storage";
import { Save, X, Plus } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface EditVolunteerProfileProps {
  onBack: () => void;
  onSave: () => void;
}

const skillOptions = [
  "Reception", "Social Media", "Kitchen", "Bar Help", "Tours", 
  "Maintenance", "Events", "Teaching", "Marketing", "Photography", 
  "Web Design", "Cleaning", "Housekeeping", "Guest Relations",
  "Content Creation", "Customer Service", "Administration"
];

const languageOptions = [
  "English", "Spanish", "French", "German", "Portuguese", "Italian",
  "Dutch", "Russian", "Mandarin", "Japanese", "Korean", "Arabic",
  "Hindi", "Thai", "Vietnamese", "Swedish", "Norwegian", "Danish"
];

const experienceLevels = ["Beginner", "Intermediate", "Advanced"];

export function EditVolunteerProfile({ onBack, onSave }: EditVolunteerProfileProps) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const data = LocalStorageManager.getUserData();
    if (data) {
      setUserData(data);
      setFormData(data.profile);
      setSelectedSkills(data.profile.skills || []);
      setSelectedLanguages(data.profile.languages || []);
    }
  }, []);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const toggleLanguage = (language: string) => {
    setSelectedLanguages(prev => 
      prev.includes(language) 
        ? prev.filter(l => l !== language)
        : [...prev, language]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const updatedProfile = {
        ...formData,
        skills: selectedSkills,
        languages: selectedLanguages
      };

      const updatedUserData = {
        ...userData,
        profile: updatedProfile
      };

      LocalStorageManager.saveUserData(updatedUserData);
      
      toast.success("Profile updated successfully!");
      onSave();
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Button variant="ghost" onClick={onBack}>
                ← Back
              </Button>
              <h1 className="text-2xl mt-2">Edit Your Profile</h1>
              <p className="text-muted-foreground">Update your volunteer profile information</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName || ''}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName || ''}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city || ''}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={formData.country || ''}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell hostels about yourself, your experience, and what motivates you to volunteer..."
                  value={formData.bio || ''}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Skills & Experience */}
          <Card>
            <CardHeader>
              <CardTitle>Skills & Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Experience Level</Label>
                <Select 
                  value={formData.experience || ''} 
                  onValueChange={(value) => handleInputChange('experience', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceLevels.map(level => (
                      <SelectItem key={level} value={level}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Skills</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Select all skills that apply to you
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {skillOptions.map(skill => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox
                        id={skill}
                        checked={selectedSkills.includes(skill)}
                        onCheckedChange={() => toggleSkill(skill)}
                      />
                      <Label htmlFor={skill} className="text-sm">{skill}</Label>
                    </div>
                  ))}
                </div>
                {selectedSkills.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm text-muted-foreground mb-2">Selected skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedSkills.map(skill => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-1 h-auto p-0 text-muted-foreground hover:text-foreground"
                            onClick={() => toggleSkill(skill)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <Label>Languages</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Select languages you can speak
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {languageOptions.map(language => (
                    <div key={language} className="flex items-center space-x-2">
                      <Checkbox
                        id={language}
                        checked={selectedLanguages.includes(language)}
                        onCheckedChange={() => toggleLanguage(language)}
                      />
                      <Label htmlFor={language} className="text-sm">{language}</Label>
                    </div>
                  ))}
                </div>
                {selectedLanguages.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm text-muted-foreground mb-2">Selected languages:</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedLanguages.map(language => (
                        <Badge key={language} variant="outline">
                          {language}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-1 h-auto p-0 text-muted-foreground hover:text-foreground"
                            onClick={() => toggleLanguage(language)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Availability */}
          <Card>
            <CardHeader>
              <CardTitle>Availability & Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="availableFrom">Available From</Label>
                  <Input
                    id="availableFrom"
                    type="date"
                    value={formData.availability?.from || ''}
                    onChange={(e) => handleInputChange('availability', { 
                      ...formData.availability, 
                      from: e.target.value 
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="availableTo">Available Until</Label>
                  <Input
                    id="availableTo"
                    type="date"
                    value={formData.availability?.to || ''}
                    onChange={(e) => handleInputChange('availability', { 
                      ...formData.availability, 
                      to: e.target.value 
                    })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="commitment">Preferred Commitment Length</Label>
                <Select 
                  value={formData.commitment || ''} 
                  onValueChange={(value) => handleInputChange('commitment', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select commitment length" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-2 weeks">1-2 weeks</SelectItem>
                    <SelectItem value="2-4 weeks">2-4 weeks</SelectItem>
                    <SelectItem value="1-2 months">1-2 months</SelectItem>
                    <SelectItem value="2-3 months">2-3 months</SelectItem>
                    <SelectItem value="3+ months">3+ months</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onBack}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              <Save className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
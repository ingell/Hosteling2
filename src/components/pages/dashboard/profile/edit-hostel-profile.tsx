import React, { useState, useEffect } from "react";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import { Textarea } from "../../../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../ui/select";
import { Checkbox } from "../../../ui/checkbox";
import { Badge } from "../../../ui/badge";
import { LocalStorageManager, UserData } from "../../../utils/local-storage";
import { Save, X, Plus, MapPin, Building } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface EditHostelProfileProps {
  onBack: () => void;
  onSave: () => void;
}

const amenityOptions = [
  "Free WiFi", "Kitchen Access", "Laundry", "Air Conditioning", 
  "Heating", "Common Area", "Rooftop Terrace", "Swimming Pool",
  "Bar/Restaurant", "Tours Available", "Luggage Storage", "24h Reception",
  "Security Lockers", "Bike Rental", "Airport Transfer", "Free Breakfast"
];

const positionTypes = [
  "Reception", "Housekeeping", "Kitchen Help", "Bar Staff", 
  "Tour Guide", "Maintenance", "Social Media", "Marketing",
  "Event Coordinator", "Administrative", "Customer Service"
];

const accommodationTypes = [
  "Shared Dorm", "Private Room", "Staff Quarters", "Separate Apartment"
];

export function EditHostelProfile({ onBack, onSave }: EditHostelProfileProps) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const data = LocalStorageManager.getUserData();
    if (data) {
      setUserData(data);
      setFormData(data.profile);
      setSelectedAmenities(data.profile.amenities || []);
      setSelectedPositions(data.profile.availablePositions || []);
    }
  }, []);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const togglePosition = (position: string) => {
    setSelectedPositions(prev => 
      prev.includes(position) 
        ? prev.filter(p => p !== position)
        : [...prev, position]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const updatedProfile = {
        ...formData,
        amenities: selectedAmenities,
        availablePositions: selectedPositions
      };

      const updatedUserData = {
        ...userData,
        profile: updatedProfile
      };

      LocalStorageManager.saveUserData(updatedUserData);
      
      toast.success("Hostel profile updated successfully!");
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
              <h1 className="text-2xl mt-2">Edit Hostel Profile</h1>
              <p className="text-muted-foreground">Update your hostel information</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="w-5 h-5 mr-2 text-orange-600" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="hostelName">Hostel Name</Label>
                <Input
                  id="hostelName"
                  value={formData.hostelName || ''}
                  onChange={(e) => handleInputChange('hostelName', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your hostel, its atmosphere, and what makes it special..."
                  value={formData.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactFirstName">Contact First Name</Label>
                  <Input
                    id="contactFirstName"
                    value={formData.contactFirstName || ''}
                    onChange={(e) => handleInputChange('contactFirstName', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="contactLastName">Contact Last Name</Label>
                  <Input
                    id="contactLastName"
                    value={formData.contactLastName || ''}
                    onChange={(e) => handleInputChange('contactLastName', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Contact Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Contact Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-orange-600" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="address">Street Address</Label>
                <Input
                  id="address"
                  value={formData.address || ''}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <Label htmlFor="region">State/Region</Label>
                  <Input
                    id="region"
                    value={formData.region || ''}
                    onChange={(e) => handleInputChange('region', e.target.value)}
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
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  value={formData.postalCode || ''}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Volunteer Opportunities */}
          <Card>
            <CardHeader>
              <CardTitle>Volunteer Opportunities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Available Positions</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Select the types of volunteer positions you offer
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {positionTypes.map(position => (
                    <div key={position} className="flex items-center space-x-2">
                      <Checkbox
                        id={position}
                        checked={selectedPositions.includes(position)}
                        onCheckedChange={() => togglePosition(position)}
                      />
                      <Label htmlFor={position} className="text-sm">{position}</Label>
                    </div>
                  ))}
                </div>
                {selectedPositions.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm text-muted-foreground mb-2">Available positions:</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedPositions.map(position => (
                        <Badge key={position} variant="secondary">
                          {position}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-1 h-auto p-0 text-muted-foreground hover:text-foreground"
                            onClick={() => togglePosition(position)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="volunteersNeeded">Volunteers Needed</Label>
                  <Input
                    id="volunteersNeeded"
                    type="number"
                    min="1"
                    value={formData.volunteersNeeded || ''}
                    onChange={(e) => handleInputChange('volunteersNeeded', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="accommodationType">Accommodation Offered</Label>
                  <Select 
                    value={formData.accommodationType || ''} 
                    onValueChange={(value) => handleInputChange('accommodationType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select accommodation type" />
                    </SelectTrigger>
                    <SelectContent>
                      {accommodationTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="workHours">Work Hours Per Day</Label>
                  <Select 
                    value={formData.workHours || ''} 
                    onValueChange={(value) => handleInputChange('workHours', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select work hours" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2-3 hours">2-3 hours</SelectItem>
                      <SelectItem value="4-5 hours">4-5 hours</SelectItem>
                      <SelectItem value="5-6 hours">5-6 hours</SelectItem>
                      <SelectItem value="6-8 hours">6-8 hours</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="minimumStay">Minimum Stay</Label>
                  <Select 
                    value={formData.minimumStay || ''} 
                    onValueChange={(value) => handleInputChange('minimumStay', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select minimum stay" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1 week">1 week</SelectItem>
                      <SelectItem value="2 weeks">2 weeks</SelectItem>
                      <SelectItem value="3 weeks">3 weeks</SelectItem>
                      <SelectItem value="1 month">1 month</SelectItem>
                      <SelectItem value="2 months">2 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Amenities */}
          <Card>
            <CardHeader>
              <CardTitle>Amenities & Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Available Amenities</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Select the amenities your hostel offers
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {amenityOptions.map(amenity => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox
                        id={amenity}
                        checked={selectedAmenities.includes(amenity)}
                        onCheckedChange={() => toggleAmenity(amenity)}
                      />
                      <Label htmlFor={amenity} className="text-sm">{amenity}</Label>
                    </div>
                  ))}
                </div>
                {selectedAmenities.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm text-muted-foreground mb-2">Selected amenities:</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedAmenities.map(amenity => (
                        <Badge key={amenity} variant="outline">
                          {amenity}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-1 h-auto p-0 text-muted-foreground hover:text-foreground"
                            onClick={() => toggleAmenity(amenity)}
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
import {
  Building,
  CheckCircle,
  Facebook,
  Globe,
  Heart,
  Instagram,
  Loader2,
  Mail,
  Phone,
  Twitter,
  User,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import hostelingLogo from "../../assets/LogoColored.png";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Checkbox } from "../../components/ui/checkbox";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { analyticsService } from "../services/analyticsService";
import PrelaunchService from "../services/prelaunchService";
import { useLanguage } from "../shared/contexts/LanguageContext";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  userType: "volunteer" | "hostel" | "";
  consent: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  userType?: string;
  consent?: string;
}

export const PreLaunchPage: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    userType: "",
    consent: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Track page view on component mount
  React.useEffect(() => {
    analyticsService.trackPageView({
      pageName: "PreLaunch Landing Page",
      url: window.location.href,
    });
  }, []);

  const validateEmail = PrelaunchService.validateEmail;
  const validatePhone = PrelaunchService.validatePhone;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.userType) {
      newErrors.userType = "Please select your user type";
    }

    if (!formData.consent) {
      newErrors.consent = "You must consent to receive communications";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit to Azure via our service
      const response = await PrelaunchService.submitPrelaunchForm({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        userType: formData.userType as "volunteer" | "hostel",
        consent: formData.consent,
      });

      if (response.success) {
        setIsSubmitted(true);
        toast.success(response.message);

        // Track successful signup
        analyticsService.trackPrelaunchSignup(
          formData.userType as "volunteer" | "hostel",
          formData.email
        );
        analyticsService.trackFormInteraction("submit_success");
      } else {
        toast.error(response.message);
        analyticsService.trackFormInteraction("submit_error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const shareUrl = window.location.href;
  const shareText =
    "Join the Hosteling community - connecting volunteers with hostels worldwide!";

  const handleShare = (platform: string) => {
    analyticsService.trackSocialShare(platform);

    let url = "";
    switch (platform) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          shareText
        )}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}`;
        break;
      case "instagram":
        // Instagram doesn't support direct URL sharing, so we'll copy to clipboard
        navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        toast.success(
          "Link copied to clipboard! Share it on your Instagram story."
        );
        return;
    }
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=400");
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="mb-6">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl mb-4 text-gray-900">Thank You!</h1>
              <p className="text-lg text-gray-600 mb-6">
                You're now on our early access list. We'll notify you as soon as
                Hosteling launches!
              </p>
              <div className="flex justify-center space-x-4 mb-6">
                <Badge
                  variant="secondary"
                  className="bg-orange-100 text-orange-800"
                >
                  <Users className="w-4 h-4 mr-1" />
                  {formData.userType === "volunteer" ? "Volunteer" : "Hostel"}
                </Badge>
              </div>
            </div>

            <div className="border-t pt-6">
              <p className="text-sm text-gray-600 mb-4">
                Help us spread the word!
              </p>
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => handleShare("twitter")}
                  className="group flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  title="Share on Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare("facebook")}
                  className="group flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  title="Share on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare("instagram")}
                  className="group flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  title="Copy link for Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                userType: "",
                consent: false,
              });
            }}
            className="text-gray-600 hover:text-gray-800"
          >
            Sign up another person
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-20">
            <div className="flex items-center space-x-4">
              <img
                src={hostelingLogo}
                alt="Hosteling Logo"
                className="h-8 w-auto backdrop-black"
              />
              <span className="text-3xl text-gray-900">hosteling</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div>
              <Badge className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white mb-4">
                Coming Soon
              </Badge>
              <h1 className="text-4xl lg:text-5xl mb-6 text-gray-900">
                Be the first to know when we launch!
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join thousands of adventurous travelers and welcoming hostels
                preparing for the future of volunteer exchange.
              </p>
            </div>

            {/* What is Hosteling */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-orange-100">
              <h3 className="text-xl mb-4 text-gray-900">What is Hosteling?</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Heart className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-900">For Volunteers:</p>
                    <p className="text-gray-600 text-sm">
                      Exchange your skills for free accommodation at hostels
                      worldwide. Work a few hours a day and immerse yourself in
                      local culture.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Building className="w-6 h-6 text-yellow-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-900">For Hostels:</p>
                    <p className="text-gray-600 text-sm">
                      Find reliable, enthusiastic volunteers to help with daily
                      operations while creating a vibrant international
                      community.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Globe className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-900">Global Community:</p>
                    <p className="text-gray-600 text-sm">
                      Connect with like-minded travelers, share experiences, and
                      build lasting friendships across continents.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600 flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                We respect your privacy and will never share your data.
              </p>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:ml-8">
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader className="text-center bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-t-lg">
                <CardTitle className="text-2xl">Get Early Access</CardTitle>
                <CardDescription className="text-orange-100">
                  Join our waiting list and be among the first to experience
                  Hosteling
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-gray-700">
                        <User className="w-4 h-4 inline mr-1" />
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        className={errors.firstName ? "border-red-500" : ""}
                        placeholder="John"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-gray-700">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        className={errors.lastName ? "border-red-500" : ""}
                        placeholder="Doe"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700">
                      <Mail className="w-4 h-4 inline mr-1" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className={errors.email ? "border-red-500" : ""}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-700">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className={errors.phone ? "border-red-500" : ""}
                      placeholder="+1 (555) 123-4567"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm">{errors.phone}</p>
                    )}
                  </div>

                  {/* User Type */}
                  <div className="space-y-2">
                    <Label className="text-gray-700">
                      <Users className="w-4 h-4 inline mr-1" />I am a...
                    </Label>
                    <Select
                      value={formData.userType}
                      onValueChange={(value) => {
                        handleInputChange("userType", value);
                        analyticsService.trackUserTypeSelection(
                          value as "volunteer" | "hostel"
                        );
                      }}
                    >
                      <SelectTrigger
                        className={errors.userType ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder="Select your type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="volunteer">
                          <div className="flex items-center">
                            <Heart className="w-4 h-4 mr-2 text-orange-500" />
                            <div>
                              <p>Volunteer</p>
                              <p className="text-sm text-gray-500">
                                Looking to travel and work at hostels
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="hostel">
                          <div className="flex items-center">
                            <Building className="w-4 h-4 mr-2 text-yellow-500" />
                            <div>
                              <p>Hostel Owner/Manager</p>
                              <p className="text-sm text-gray-500">
                                Looking to host volunteers
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.userType && (
                      <p className="text-red-500 text-sm">{errors.userType}</p>
                    )}
                  </div>

                  {/* Consent Checkbox */}
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="consent"
                        checked={formData.consent}
                        onCheckedChange={(checked) =>
                          handleInputChange("consent", checked as boolean)
                        }
                        className={errors.consent ? "border-red-500" : ""}
                      />
                      <Label
                        htmlFor="consent"
                        className="text-sm text-gray-600 leading-relaxed cursor-pointer"
                      >
                        I consent to receive communications about Hosteling's
                        launch and updates. You can unsubscribe at any time.
                        (Required for GDPR compliance)
                      </Label>
                    </div>
                    {errors.consent && (
                      <p className="text-red-500 text-sm">{errors.consent}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white h-12 text-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Signing You Up...
                      </>
                    ) : (
                      "Get Early Access"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Social Sharing Section */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            Help us spread the word and join our community!
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => handleShare("twitter")}
              className="group flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              title="Share on Twitter"
            >
              <Twitter className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleShare("facebook")}
              className="group flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              title="Share on Facebook"
            >
              <Facebook className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleShare("instagram")}
              className="group flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              title="Copy link for Instagram"
            >
              <Instagram className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Click Instagram to copy the link for your story!
          </p>
        </div>
      </div>
    </div>
  );
};

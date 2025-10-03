import React from "react";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import { ArrowLeft, Shield, Users } from "lucide-react";

interface PrivacyProps {
  onBack: () => void;
}

export function PrivacyPage({ onBack }: PrivacyProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-2 cursor-pointer" onClick={onBack}>
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl">Hosteling</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl mb-4">Privacy Policy</h1>
          <p className="text-xl text-muted-foreground">
            Your privacy and security are our top priorities. Here's how we protect your information.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Last updated: October 2024
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl mb-4">Information We Collect</h2>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Personal Information</h3>
                  <p>
                    When you create an account, we collect information such as your name, email address, 
                    phone number, and profile information. For hostels, we also collect business information 
                    including hostel name, location, and contact details.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Usage Information</h3>
                  <p>
                    We collect information about how you use our platform, including pages visited, 
                    features used, and interactions with other users. This helps us improve our service 
                    and provide better recommendations.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Communication Data</h3>
                  <p>
                    Messages sent through our platform are stored to facilitate communication between 
                    volunteers and hostels. We do not read private messages unless required for safety 
                    or legal reasons.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl mb-4">How We Use Your Information</h2>
              <div className="space-y-4 text-muted-foreground">
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>To provide and maintain our volunteer matching service</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>To facilitate communication between volunteers and hostels</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>To send you important updates about your account and bookings</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>To improve our platform based on usage patterns and feedback</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>To ensure safety and prevent fraud or misuse of our platform</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>To comply with legal obligations and respond to legal requests</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl mb-4">Information Sharing</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We do not sell, trade, or rent your personal information to third parties. 
                  We only share your information in the following circumstances:
                </p>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">With Hostels and Volunteers</h3>
                    <p>
                      When you apply for a volunteer position or respond to an application, 
                      we share relevant profile information to facilitate the matching process.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Service Providers</h3>
                    <p>
                      We work with trusted third-party services for email delivery, analytics, 
                      and customer support. These providers only access information necessary 
                      to perform their services.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Legal Requirements</h3>
                    <p>
                      We may disclose information when required by law, to protect our rights, 
                      or to ensure the safety of our users.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl mb-4">Data Security</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We implement robust security measures to protect your personal information:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Encryption in transit and at rest using industry-standard protocols</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Regular security audits and vulnerability assessments</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Access controls limiting who can view your information</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Secure data centers with 24/7 monitoring</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl mb-4">Your Rights</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>You have the following rights regarding your personal information:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Access</h3>
                    <p>Request a copy of all personal information we have about you.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Correction</h3>
                    <p>Update or correct any inaccurate personal information.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Deletion</h3>
                    <p>Request deletion of your account and associated data.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Portability</h3>
                    <p>Export your data in a machine-readable format.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl mb-4">Cookies and Tracking</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We use cookies and similar technologies to enhance your experience on our platform. 
                  This includes:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Essential cookies for platform functionality and security</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Analytics cookies to understand how users interact with our site</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Preference cookies to remember your settings and choices</span>
                  </li>
                </ul>
                <p>
                  You can manage your cookie preferences in your browser settings or through 
                  our cookie consent banner.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl mb-4">Contact Us</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  If you have any questions about this Privacy Policy or how we handle your data, 
                  please contact us:
                </p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> privacy@hostelingapp.com</p>
                  <p><strong>Data Protection Officer:</strong> dpo@hostelingapp.com</p>
                  <p><strong>Address:</strong> Privacy Team, Hosteling Inc.</p>
                </div>
                <p>
                  We will respond to all inquiries within 30 days and take appropriate action 
                  to address your concerns.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-0">
            <CardContent className="p-8">
              <h2 className="text-2xl mb-4">Questions About Privacy?</h2>
              <p className="text-muted-foreground mb-6">
                Our team is here to help you understand how we protect your information.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button>Contact Privacy Team</Button>
                <Button variant="outline">View Terms of Service</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
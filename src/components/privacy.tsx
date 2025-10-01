import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ArrowLeft, Shield, Users } from "lucide-react";

interface PrivacyProps {
  onBack: () => void;
}

export function Privacy({ onBack }: PrivacyProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: March 15, 2024</p>
        </div>

        <Card>
          <CardContent className="p-8 prose prose-gray dark:prose-invert max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                <p className="text-muted-foreground">
                  At Hosteling, we respect your privacy and are committed to
                  protecting your personal data. This Privacy Policy explains
                  how we collect, use, disclose, and safeguard your information
                  when you use our platform. Please read this policy carefully
                  to understand our practices.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  2. Information We Collect
                </h2>

                <h3 className="text-lg font-semibold mb-3">
                  Personal Information You Provide
                </h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                  <li>Account information (name, email, password)</li>
                  <li>
                    Profile information (bio, skills, preferences, photos)
                  </li>
                  <li>Contact details and location information</li>
                  <li>
                    Communication content (messages, reviews, forum posts)
                  </li>
                  <li>Payment information (when applicable)</li>
                </ul>

                <h3 className="text-lg font-semibold mb-3">
                  Information Collected Automatically
                </h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>
                    Device information (IP address, browser type, operating
                    system)
                  </li>
                  <li>
                    Usage data (pages visited, time spent, click patterns)
                  </li>
                  <li>Location data (with your permission)</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  3. How We Use Your Information
                </h2>
                <p className="text-muted-foreground mb-4">
                  We use your information to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Provide and maintain our platform services</li>
                  <li>
                    Match volunteers with appropriate hostel opportunities
                  </li>
                  <li>Facilitate communication between users</li>
                  <li>Send important notifications and updates</li>
                  <li>Improve our services and user experience</li>
                  <li>Ensure platform safety and security</li>
                  <li>Comply with legal obligations</li>
                  <li>Prevent fraud and abuse</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  4. Information Sharing and Disclosure
                </h2>
                <p className="text-muted-foreground mb-4">
                  We may share your information in the following circumstances:
                </p>

                <h3 className="text-lg font-semibold mb-3">With Other Users</h3>
                <p className="text-muted-foreground mb-4">
                  Profile information is visible to other users to facilitate
                  matching and communication. You control what information is
                  displayed in your profile.
                </p>

                <h3 className="text-lg font-semibold mb-3">
                  With Service Providers
                </h3>
                <p className="text-muted-foreground mb-4">
                  We may share information with third-party service providers
                  who help us operate our platform, such as hosting, analytics,
                  and customer support services.
                </p>

                <h3 className="text-lg font-semibonal mb-3">
                  Legal Requirements
                </h3>
                <p className="text-muted-foreground mb-4">
                  We may disclose information if required by law, court order,
                  or to protect our rights, property, or safety, or that of our
                  users or others.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  5. Data Security
                </h2>
                <p className="text-muted-foreground mb-4">
                  We implement appropriate technical and organizational measures
                  to protect your personal information against unauthorized
                  access, alteration, disclosure, or destruction. These measures
                  include:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Encryption of sensitive data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls and authentication systems</li>
                  <li>Employee training on data protection</li>
                  <li>Incident response procedures</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  6. Your Rights and Choices
                </h2>
                <p className="text-muted-foreground mb-4">
                  Depending on your location, you may have the following rights
                  regarding your personal information:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>
                    <strong>Access:</strong> Request a copy of your personal
                    information
                  </li>
                  <li>
                    <strong>Correction:</strong> Update or correct inaccurate
                    information
                  </li>
                  <li>
                    <strong>Deletion:</strong> Request deletion of your personal
                    information
                  </li>
                  <li>
                    <strong>Portability:</strong> Request transfer of your data
                    to another service
                  </li>
                  <li>
                    <strong>Opt-out:</strong> Unsubscribe from marketing
                    communications
                  </li>
                  <li>
                    <strong>Objection:</strong> Object to certain types of data
                    processing
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  7. Cookies and Tracking Technologies
                </h2>
                <p className="text-muted-foreground mb-4">
                  We use cookies and similar technologies to enhance your
                  experience on our platform. These technologies help us:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Remember your preferences and settings</li>
                  <li>Understand how you use our platform</li>
                  <li>Improve our services and user experience</li>
                  <li>Provide relevant content and recommendations</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  You can control cookie settings through your browser
                  preferences, but some features may not function properly if
                  cookies are disabled.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  8. International Data Transfers
                </h2>
                <p className="text-muted-foreground">
                  Your information may be transferred to and processed in
                  countries other than your own. We ensure appropriate
                  safeguards are in place to protect your information during
                  such transfers, in accordance with applicable data protection
                  laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  9. Data Retention
                </h2>
                <p className="text-muted-foreground">
                  We retain your personal information only as long as necessary
                  to fulfill the purposes for which it was collected, comply
                  with legal obligations, resolve disputes, and enforce our
                  agreements. When information is no longer needed, we securely
                  delete or anonymize it.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  10. Children's Privacy
                </h2>
                <p className="text-muted-foreground">
                  Our platform is not intended for users under 18 years of age.
                  We do not knowingly collect personal information from children
                  under 18. If we become aware that we have collected such
                  information, we will take steps to delete it promptly.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  11. Changes to This Privacy Policy
                </h2>
                <p className="text-muted-foreground">
                  We may update this Privacy Policy from time to time to reflect
                  changes in our practices or legal requirements. We will notify
                  you of significant changes via email or platform notification.
                  Your continued use of our platform after changes become
                  effective constitutes acceptance of the updated policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have any questions, concerns, or requests regarding
                  this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-muted p-4 rounded-lg mt-4">
                  <p className="text-sm">
                    <strong>Hosteling Privacy Team</strong>
                    <br />
                    Email: privacy@hostelingapp.com
                    <br />
                    Subject Line: Privacy Policy Inquiry
                    <br />
                    <br />
                    For data protection rights requests:
                    <br />
                    Email: dpo@hostelingapp.com
                    <br />
                    Subject Line: Data Rights Request
                  </p>
                </div>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

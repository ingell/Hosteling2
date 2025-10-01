import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ArrowLeft, FileText, Users } from "lucide-react";

interface TermsProps {
  onBack: () => void;
}

export function Terms({ onBack }: TermsProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: March 15, 2024</p>
        </div>

        <Card>
          <CardContent className="p-8 prose prose-gray dark:prose-invert max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  1. Agreement to Terms
                </h2>
                <p className="text-muted-foreground">
                  By accessing and using Hosteling ("the Platform"), you accept
                  and agree to be bound by the terms and provision of this
                  agreement. If you do not agree to abide by the above, please
                  do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  2. Description of Service
                </h2>
                <p className="text-muted-foreground mb-4">
                  Hosteling is a platform that connects volunteers with hostels
                  worldwide. Our service includes:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Matching volunteers with hostel opportunities</li>
                  <li>Profile creation and management tools</li>
                  <li>Communication features between users</li>
                  <li>Safety guidelines and resources</li>
                  <li>Community features and support</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  3. User Accounts
                </h2>
                <p className="text-muted-foreground mb-4">
                  To use certain features of our platform, you must create an
                  account. You agree to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Provide accurate, current, and complete information</li>
                  <li>
                    Maintain and update your information to keep it accurate
                  </li>
                  <li>Maintain the security of your password</li>
                  <li>
                    Accept responsibility for all activities under your account
                  </li>
                  <li>Notify us immediately of any unauthorized use</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. User Conduct</h2>
                <p className="text-muted-foreground mb-4">
                  Users agree not to use the platform to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Harass, abuse, or harm other users</li>
                  <li>Post false, misleading, or fraudulent content</li>
                  <li>Impersonate another person or entity</li>
                  <li>Distribute spam or unsolicited communications</li>
                  <li>Upload malicious code or viruses</li>
                  <li>Attempt to gain unauthorized access to the platform</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  5. Volunteer Arrangements
                </h2>
                <p className="text-muted-foreground mb-4">
                  Hosteling facilitates connections between volunteers and
                  hostels but is not party to the actual volunteer arrangements.
                  Users understand that:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>
                    All arrangements are made directly between volunteers and
                    hostels
                  </li>
                  <li>
                    Hosteling does not guarantee the quality, safety, or
                    legality of any opportunity
                  </li>
                  <li>
                    Users are responsible for their own safety and well-being
                  </li>
                  <li>
                    We recommend following our safety guidelines and conducting
                    due diligence
                  </li>
                  <li>
                    Users should verify visa requirements and legal obligations
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  6. Content and Intellectual Property
                </h2>
                <p className="text-muted-foreground mb-4">
                  Users retain ownership of content they post but grant
                  Hosteling a license to use, display, and distribute such
                  content on the platform. All platform features, design, and
                  content are owned by Hosteling and protected by intellectual
                  property laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  7. Privacy and Data Protection
                </h2>
                <p className="text-muted-foreground">
                  Your privacy is important to us. Please review our Privacy
                  Policy, which governs how we collect, use, and protect your
                  personal information. By using our service, you agree to the
                  collection and use of information in accordance with our
                  Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  8. Disclaimers and Limitation of Liability
                </h2>
                <p className="text-muted-foreground mb-4">
                  The platform is provided "as is" without warranties of any
                  kind. Hosteling disclaims all warranties and shall not be
                  liable for:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Any damages arising from use of the platform</li>
                  <li>Actions or omissions of other users</li>
                  <li>Issues with volunteer arrangements</li>
                  <li>Loss of data or interruption of service</li>
                  <li>Third-party content or services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">9. Termination</h2>
                <p className="text-muted-foreground">
                  We may terminate or suspend your account and access to the
                  platform at our sole discretion, without prior notice, for
                  conduct that we believe violates these Terms or is harmful to
                  other users, us, or third parties.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  10. Changes to Terms
                </h2>
                <p className="text-muted-foreground">
                  We reserve the right to modify these terms at any time. We
                  will notify users of significant changes via email or platform
                  notification. Continued use of the platform after changes
                  constitutes acceptance of the new terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  11. Governing Law
                </h2>
                <p className="text-muted-foreground">
                  These Terms shall be governed by and construed in accordance
                  with applicable international laws, without regard to conflict
                  of law provisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  12. Contact Information
                </h2>
                <p className="text-muted-foreground">
                  If you have any questions about these Terms of Service, please
                  contact us at:
                </p>
                <div className="bg-muted p-4 rounded-lg mt-4">
                  <p className="text-sm">
                    <strong>Hosteling Support Team</strong>
                    <br />
                    Email: legal@hostelingapp.com
                    <br />
                    Subject Line: Terms of Service Inquiry
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

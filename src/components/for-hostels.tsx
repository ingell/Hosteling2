import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  ArrowRight,
  CheckCircle,
  Users,
  DollarSign,
  Clock,
  Star,
  MessageSquare,
  Shield,
  TrendingUp,
  Calendar,
  MapPin,
  Heart,
} from "lucide-react";
import { motion } from "motion/react";

interface ForHostelsProps {
  onSignupClick: () => void;
}

const benefits = [
  {
    icon: <DollarSign className="w-8 h-8" />,
    title: "Zero Cost Solution",
    description:
      "Unlike other platforms that charge hefty commissions, Hosteling is completely free for hostels. No setup fees, no monthly costs.",
    features: [
      "No setup fees",
      "No monthly subscriptions",
      "No booking commissions",
      "No hidden costs",
    ],
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Quality Volunteers",
    description:
      "Access motivated travelers who want meaningful experiences. Our volunteers are screened and come with genuine enthusiasm.",
    features: [
      "Pre-screened applicants",
      "Skill-based matching",
      "Motivated volunteers",
      "Global talent pool",
    ],
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Flexible Arrangements",
    description:
      "Set your own terms for volunteer duration, tasks, and accommodation. You have full control over the arrangement.",
    features: [
      "Custom duration",
      "Define specific tasks",
      "Set accommodation terms",
      "Flexible scheduling",
    ],
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Boost Your Business",
    description:
      "Volunteers often become paying customers, recommend your hostel to friends, and help create a vibrant community atmosphere.",
    features: [
      "Future bookings",
      "Word-of-mouth marketing",
      "Social media promotion",
      "Community building",
    ],
  },
];

const features = [
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Direct Communication",
    description:
      "Communicate directly with volunteers without any platform interference. Build genuine relationships.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Verified Volunteers",
    description:
      "All volunteers complete a verification process and provide references for your peace of mind.",
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: "Easy Management",
    description:
      "Simple dashboard to manage applications, communicate with volunteers, and track arrangements.",
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "Reviews & Ratings",
    description:
      "Build your reputation through volunteer reviews and showcase your hostel to future applicants.",
  },
];

const steps = [
  {
    number: "01",
    title: "Create Your Listing",
    description:
      "Set up your hostel profile with photos, description, location, and the types of volunteers you're looking for.",
  },
  {
    number: "02",
    title: "Define Volunteer Roles",
    description:
      "Specify the tasks, skills needed, duration, and what accommodation/perks you provide in exchange.",
  },
  {
    number: "03",
    title: "Review Applications",
    description:
      "Receive applications from interested volunteers and review their profiles, skills, and references.",
  },
  {
    number: "04",
    title: "Connect & Arrange",
    description:
      "Message volunteers directly to discuss details, confirm arrangements, and welcome them to your hostel.",
  },
];

const testimonials = [
  {
    name: "Carlos Mendoza",
    hostel: "Nomad's Paradise, Bangkok",
    quote:
      "We've hosted 15 volunteers through Hosteling this year. They've helped with reception, events, and social media. The platform is free and the volunteers are fantastic!",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Sofia Petrov",
    hostel: "Mountain View Lodge, Cusco",
    quote:
      "Hosteling has been a game-changer for us. We get skilled help with our operations and the volunteers bring such positive energy to our hostel community.",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b4d4?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Luis Santos",
    hostel: "Surf & Stay Hostel, Lisbon",
    quote:
      "The quality of volunteers is outstanding. Many have become long-term friends and some even return as paying guests. It's more than just free labor - it's community building.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
];

const commonRoles = [
  {
    role: "Reception",
    description:
      "Greeting guests, checking in/out, phone calls",
    hours: "4-6 hours/day",
  },
  {
    role: "Housekeeping",
    description: "Cleaning rooms, common areas, laundry",
    hours: "3-5 hours/day",
  },
  {
    role: "Kitchen Help",
    description: "Breakfast prep, cooking, dishwashing",
    hours: "4-6 hours/day",
  },
  {
    role: "Maintenance",
    description: "Basic repairs, painting, garden work",
    hours: "4-6 hours/day",
  },
  {
    role: "Social Media",
    description:
      "Content creation, posting, community management",
    hours: "2-4 hours/day",
  },
  {
    role: "Tours & Activities",
    description: "Leading tours, organizing events",
    hours: "Flexible",
  },
];

export function ForHostels({ onSignupClick }: ForHostelsProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl max-w-4xl mx-auto">
                Find amazing volunteers.
                <span className="text-primary">
                  {" "}
                  Pay nothing.
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Connect with skilled, motivated travelers who
                want to contribute to your hostel in exchange
                for accommodation. 100% free platform for
                hostels.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="px-8"
                onClick={onSignupClick}
              >
                List Your Hostel
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8"
              >
                Browse Volunteer Profiles
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <span>✓ 100% Free Platform</span>
              <span>✓ No Commission Fees</span>
              <span>✓ Direct Communication</span>
              <span>✓ Verified Volunteers</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2>Why hostels choose Hosteling</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're not just another booking platform. We're a
              community that connects hostels with passionate
              travelers who want to contribute.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
              >
                <Card className="p-8 h-full">
                  <CardContent className="p-0 space-y-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                      {benefit.icon}
                    </div>
                    <div className="space-y-3">
                      <h3>{benefit.title}</h3>
                      <p className="text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                    <div className="space-y-2">
                      {benefit.features.map(
                        (feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="flex items-center space-x-3"
                          >
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">
                              {feature}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2>How it works for hostels</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get started in minutes and connect with your first
              volunteer within days.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary text-xl">
                  {step.number}
                </div>
                <h3>{step.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2>Platform features</h2>
            <p className="text-muted-foreground">
              Everything you need to find and manage volunteers
              effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                className="text-center space-y-4"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto text-primary">
                  {feature.icon}
                </div>
                <h4>{feature.title}</h4>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Volunteer Roles */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2>Common volunteer roles</h2>
            <p className="text-muted-foreground">
              Examples of tasks volunteers can help with at your
              hostel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commonRoles.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
              >
                <Card className="p-6">
                  <CardContent className="p-0 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4>{item.role}</h4>
                      <Badge variant="outline">
                        {item.hours}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2>What hostel owners are saying</h2>
            <p className="text-muted-foreground">
              Real experiences from hostels using Hosteling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
              >
                <Card className="p-6">
                  <CardContent className="p-0 space-y-4">
                    <p className="text-muted-foreground italic">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center space-x-3">
                      <ImageWithFallback
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-sm">
                          {testimonial.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {testimonial.hostel}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2>Simple, transparent pricing</h2>
              <p className="text-muted-foreground">
                Unlike other platforms that charge hefty
                commissions, Hosteling is completely free.
              </p>
            </div>

            <Card className="p-12 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-primary/20">
              <CardContent className="p-0 space-y-8">
                <div className="space-y-4">
                  <div className="text-6xl text-primary">
                    $0
                  </div>
                  <h3>Forever Free</h3>
                  <p className="text-muted-foreground">
                    No setup fees, no monthly costs, no booking
                    commissions. Just connect with volunteers
                    for free.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    "Unlimited hostel listings",
                    "Direct volunteer communication",
                    "Application management",
                    "Reviews and ratings",
                    "24/7 platform support",
                    "No commission on bookings",
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center space-x-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  size="lg"
                  className="px-8"
                  onClick={onSignupClick}
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2>Frequently asked questions</h2>
            <p className="text-muted-foreground">
              Common questions from hostel owners about using
              Hosteling.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question:
                  "How is Hosteling free for hostels?",
                answer:
                  "We believe in creating genuine connections without barriers. Our platform is funded through optional premium features and partnerships, not by charging hostels or volunteers.",
              },
              {
                question:
                  "What kind of volunteers can I expect?",
                answer:
                  "Our volunteers are typically young travelers (18-35) with various skills and backgrounds. Many have hospitality experience, language skills, or technical abilities. All complete a verification process.",
              },
              {
                question: "How do I screen volunteers?",
                answer:
                  "Review their profiles, previous volunteer experiences, references, and communicate directly through our messaging system. You have full control over who you accept.",
              },
              {
                question:
                  "What should I provide to volunteers?",
                answer:
                  "Typically a bed in a shared dormitory, access to common areas, and basic amenities. Some hostels also provide meals or other perks. You set your own terms.",
              },
              {
                question:
                  "How long do volunteers usually stay?",
                answer:
                  "Most arrangements are 2-8 weeks, but this varies based on your needs and the volunteer's travel plans. You can specify minimum and maximum durations.",
              },
              {
                question:
                  "What if a volunteer doesn't work out?",
                answer:
                  "While rare, you can end an arrangement early if needed. We encourage clear communication and provide dispute resolution support if required.",
              },
            ].map((faq, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0 space-y-3">
                  <h4>{faq.question}</h4>
                  <p className="text-muted-foreground">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2>Ready to find your first volunteer?</h2>
            <p className="text-muted-foreground">
              Join hundreds of hostels worldwide who trust
              Hosteling to connect them with amazing
              volunteers. Get started today - it's completely
              free.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="px-8"
              onClick={onSignupClick}
            >
              List Your Hostel Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8"
            >
              Contact Our Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight, CheckCircle, MessageSquare, Calendar, Shield, Heart, Clock, Users, Globe, Search, MapPin } from "lucide-react";
import { motion } from "motion/react";

interface HowItWorksProps {
  onSignupClick: () => void;
}

const steps = [
  {
    number: "01",
    title: "Create Your Profile",
    description: "Sign up for free and tell us about your skills, travel plans, and what kind of volunteer work interests you.",
    icon: <Users className="w-6 h-6" />,
    details: [
      "Add your skills and experience",
      "Set your travel dates and locations",
      "Upload photos and write a bio",
      "Specify your accommodation preferences"
    ]
  },
  {
    number: "02", 
    title: "Browse & Apply",
    description: "Search through hundreds of volunteer opportunities at hostels worldwide and apply to the ones that match your interests.",
    icon: <Search className="w-6 h-6" />,
    details: [
      "Filter by location, duration, and tasks",
      "Read detailed hostel descriptions",
      "View photos and previous volunteer reviews",
      "Apply with one click"
    ]
  },
  {
    number: "03",
    title: "Connect Directly",
    description: "Hostels review your application and message you directly. No middleman, no booking fees - just direct communication.",
    icon: <MessageSquare className="w-6 h-6" />,
    details: [
      "Receive messages within 24-48 hours",
      "Discuss specific arrangements",
      "Ask questions about accommodation",
      "Confirm your volunteer dates"
    ]
  },
  {
    number: "04",
    title: "Start Volunteering",
    description: "Arrive at your hostel, meet the team, and start your volunteer experience while exploring a new destination.",
    icon: <Heart className="w-6 h-6" />,
    details: [
      "Check in and meet the hostel staff",
      "Learn your tasks and schedule",
      "Enjoy free accommodation",
      "Explore the local area"
    ]
  }
];

const benefits = [
  {
    icon: <Heart className="w-8 h-8" />,
    title: "100% Free Platform",
    description: "Unlike other platforms that charge fees, VolunteerStay is completely free for volunteers. No hidden costs, no booking fees.",
    features: ["No signup fees", "No booking commissions", "No hidden charges", "Direct hostel contact"]
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Safe & Verified",
    description: "All hostels are verified and reviewed by our community. We prioritize safety and authentic experiences.",
    features: ["Verified hostel listings", "Community reviews", "Safety guidelines", "24/7 support"]
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Global Opportunities",
    description: "Access volunteer opportunities in over 50 countries across all continents. From bustling cities to remote islands.",
    features: ["50+ countries", "All continents", "Urban & rural locations", "Diverse cultures"]
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Flexible Arrangements",
    description: "Whether you want a week-long experience or several months, find opportunities that fit your travel schedule.",
    features: ["1 week to 6+ months", "Part-time options", "Seasonal opportunities", "Custom arrangements"]
  }
];

const testimonials = [
  {
    name: "Sarah Chen",
    location: "Volunteered in Lisbon, Portugal",
    quote: "I spent 3 weeks at a surf hostel in Lisbon, helping with reception and organizing events. Made lifelong friends and learned Portuguese!",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b4d4?w=100&h=100&fit=crop&crop=face"
  },
  {
    name: "Jake Morrison", 
    location: "Volunteered in Bangkok, Thailand",
    quote: "The experience was incredible. I helped with social media and got to explore Bangkok like a local. The hostel team became my second family.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  },
  {
    name: "Maria Rodriguez",
    location: "Volunteered in Cusco, Peru", 
    quote: "Worked at a mountain lodge for 6 weeks before hiking the Inca Trail. Perfect way to acclimatize and save money for my Peru adventure!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
  }
];

export function HowItWorks({ onSignupClick }: HowItWorksProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl max-w-4xl mx-auto">
                How VolunteerStay
                <span className="text-primary"> works</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Your step-by-step guide to volunteering at hostels worldwide. It's simple, free, and opens doors to incredible travel experiences.
              </p>
            </div>
            <Button size="lg" className="px-8" onClick={onSignupClick}>
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2>Get started in 4 simple steps</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From creating your profile to starting your volunteer experience, we've made the process as smooth as possible.
            </p>
          </div>

          <div className="space-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1 space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                      {step.icon}
                    </div>
                    <div>
                      <div className="text-sm text-primary">Step {step.number}</div>
                      <h3>{step.title}</h3>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-lg">
                    {step.description}
                  </p>
                  
                  <div className="space-y-3">
                    {step.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-muted-foreground">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex-1">
                  <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-0">
                    <div className="aspect-[4/3] bg-background/60 rounded-lg flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto text-primary">
                          {step.icon}
                        </div>
                        <p className="text-sm text-muted-foreground">Step {step.number} illustration</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2>Why choose VolunteerStay?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're different from other platforms. Here's why thousands of volunteers trust us for their travel experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-8 h-full">
                  <CardContent className="p-0 space-y-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                      {benefit.icon}
                    </div>
                    <div className="space-y-3">
                      <h3>{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                    <div className="space-y-2">
                      {benefit.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2>What volunteers are saying</h2>
            <p className="text-muted-foreground">
              Real experiences from real volunteers who have used VolunteerStay.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <CardContent className="p-0 space-y-4">
                    <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                    <div className="flex items-center space-x-3">
                      <ImageWithFallback
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-sm">{testimonial.name}</div>
                        <div className="text-xs text-muted-foreground">{testimonial.location}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2>Frequently asked questions</h2>
            <p className="text-muted-foreground">
              Everything you need to know about volunteering with VolunteerStay.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "Is VolunteerStay really free?",
                answer: "Yes! Unlike other platforms that charge booking fees or commissions, VolunteerStay is 100% free for volunteers. We believe in connecting people without barriers."
              },
              {
                question: "How long can I volunteer at a hostel?",
                answer: "Volunteer periods typically range from 1 week to 6 months. Some hostels offer shorter arrangements, while others prefer longer commitments. You can filter opportunities by duration."
              },
              {
                question: "What kind of work will I be doing?",
                answer: "Common tasks include reception work, cleaning, kitchen help, maintenance, social media, organizing events, and giving tours. Each listing clearly describes the required tasks."
              },
              {
                question: "Do I need experience to volunteer?",
                answer: "Most hostels welcome volunteers of all experience levels. Many positions require no prior experience, and hostels will provide training. Some specialized roles may require specific skills."
              },
              {
                question: "What's included in the accommodation?",
                answer: "Typically, you'll receive a bed in a shared dormitory, access to common areas, and basic amenities. Some hostels also include meals. Details are specified in each listing."
              },
              {
                question: "How do I apply for opportunities?",
                answer: "Create your profile, browse available opportunities, and apply with one click. Hostels will review your application and contact you directly within 24-48 hours."
              }
            ].map((faq, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0 space-y-3">
                  <h4>{faq.question}</h4>
                  <p className="text-muted-foreground">{faq.answer}</p>
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
            <h2>Ready to start your volunteer adventure?</h2>
            <p className="text-muted-foreground">
              Join thousands of travelers who have discovered the world through volunteering. 
              Create your free profile and start exploring opportunities today.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8" onClick={onSignupClick}>
              Create Your Profile
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              Browse Opportunities
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-lg">VolunteerStay</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Connecting volunteers with hostels worldwide. Travel more, spend less.
              </p>
            </div>
            <div className="space-y-4">
              <h4>For Volunteers</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>How it works</div>
                <div>Browse opportunities</div>
                <div>Safety guidelines</div>
                <div>Community</div>
              </div>
            </div>
            <div className="space-y-4">
              <h4>For Hostels</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>List your hostel</div>
                <div>Find volunteers</div>
                <div>Pricing</div>
                <div>Resources</div>
              </div>
            </div>
            <div className="space-y-4">
              <h4>Support</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Help center</div>
                <div>Contact us</div>
                <div>Terms of service</div>
                <div>Privacy policy</div>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 VolunteerStay. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
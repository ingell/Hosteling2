import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { ArrowLeft, Search, MessageCircle, Book, Users, HelpCircle, Mail, Phone } from "lucide-react";

interface HelpCenterProps {
  onBack: () => void;
  onContactClick?: () => void;
}

const popularArticles = [
  { title: "How to create your volunteer profile", category: "Getting Started", views: 1543 },
  { title: "What to expect when volunteering at hostels", category: "Volunteering", views: 1201 },
  { title: "Safety guidelines for international volunteers", category: "Safety", views: 998 },
  { title: "How to find the best volunteer opportunities", category: "Search & Apply", views: 876 },
  { title: "Managing your hostel's volunteer program", category: "For Hostels", views: 654 },
  { title: "Communication tips with international volunteers", category: "For Hostels", views: 543 }
];

const categories = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: <Book className="w-5 h-5" />,
    articles: 12,
    description: "Everything you need to know to begin your journey"
  },
  {
    id: "volunteering",
    title: "Volunteering",
    icon: <Users className="w-5 h-5" />,
    articles: 18,
    description: "Tips and guidance for volunteers"
  },
  {
    id: "safety",
    title: "Safety & Security",
    icon: <HelpCircle className="w-5 h-5" />,
    articles: 8,
    description: "Stay safe while traveling and volunteering"
  },
  {
    id: "hostels",
    title: "For Hostels",
    icon: <MessageCircle className="w-5 h-5" />,
    articles: 15,
    description: "Manage your hostel's volunteer program"
  }
];

const faqData = [
  {
    question: "Is Hosteling really free to use?",
    answer: "Yes, absolutely! Hosteling is 100% free for both volunteers and hostels. We don't charge any booking fees, commissions, or subscription costs. Our platform is funded through partnerships and optional premium features that don't affect the core functionality."
  },
  {
    question: "How do I know if a hostel opportunity is legitimate?",
    answer: "All hostels on our platform go through a verification process. Look for verified badges, read reviews from other volunteers, and don't hesitate to message the hostel directly with questions. We also provide safety guidelines and red flags to watch out for."
  },
  {
    question: "What kind of work can I expect as a volunteer?",
    answer: "Common volunteer tasks include reception work, cleaning, maintenance, social media management, organizing events, and helping with tours. The specific tasks depend on the hostel's needs and your skills. All work expectations should be clearly outlined before you apply."
  },
  {
    question: "How long do volunteer positions typically last?",
    answer: "Most volunteer positions range from 2-8 weeks, but this varies by hostel and your availability. Some hostels offer short-term opportunities (1-2 weeks) while others prefer longer commitments (2-3 months). You can filter opportunities by duration when searching."
  },
  {
    question: "Do I need special visas to volunteer?",
    answer: "Visa requirements depend on your nationality and destination country. Many countries allow volunteering on tourist visas, but some require specific volunteer or working holiday visas. We recommend checking with the relevant embassy or consulate before traveling."
  },
  {
    question: "What if I'm not satisfied with my volunteer experience?",
    answer: "If you encounter any issues, contact us immediately through our support system. We have processes in place to mediate disputes and ensure both volunteers and hostels are treated fairly. Your safety and satisfaction are our top priorities."
  }
];

export function HelpCenter({ onBack, onContactClick }: HelpCenterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("faq");

  const filteredArticles = popularArticles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl">Hosteling</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4">How can we help you?</h1>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Find answers to common questions, browse helpful articles, or get in touch with our support team.
          </p>
          
          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          {/* FAQ Tab */}
          <TabsContent value="faq">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8 text-center">
                <h2 className="text-2xl mb-4">Frequently Asked Questions</h2>
                <p className="text-muted-foreground">Quick answers to common questions about Hosteling</p>
              </div>
              
              <Accordion type="single" collapsible className="space-y-4">
                {faqData.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                    <AccordionTrigger className="text-left hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </TabsContent>

          {/* Articles Tab */}
          <TabsContent value="articles">
            <div className="mb-8">
              <h2 className="text-2xl mb-4">Popular Articles</h2>
              <p className="text-muted-foreground">Browse our most helpful guides and tutorials</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.map((article, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="secondary">{article.category}</Badge>
                      <span className="text-xs text-muted-foreground">{article.views} views</span>
                    </div>
                    <h3 className="font-semibold mb-2 hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Learn more about this topic and get step-by-step guidance.
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredArticles.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No articles found for "{searchQuery}"</p>
                <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
                  Clear search
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories">
            <div className="mb-8">
              <h2 className="text-2xl mb-4">Browse by Category</h2>
              <p className="text-muted-foreground">Find articles organized by topic</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map((category) => (
                <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                        {category.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{category.title}</h3>
                          <Badge variant="outline">{category.articles} articles</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8 text-center">
                <h2 className="text-2xl mb-4">Contact Support</h2>
                <p className="text-muted-foreground">Can't find what you're looking for? Get in touch with our team</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Options */}
                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                          <MessageCircle className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Live Chat</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Get instant help from our support team
                          </p>
                          <Badge variant="secondary">Available 24/7</Badge>
                        </div>
                      </div>
                      <Button className="w-full mt-4">Start Chat</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                          <Mail className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Email Support</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Send us an email and we'll respond within 24 hours
                          </p>
                          <p className="text-sm font-mono">support@hostelingapp.com</p>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full mt-4" onClick={onContactClick}>
                        Send Email
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                          <Phone className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Emergency Support</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            For urgent safety concerns while volunteering
                          </p>
                          <Badge variant="destructive">Emergency Only</Badge>
                        </div>
                      </div>
                      <Button variant="destructive" className="w-full mt-4">Call Emergency Line</Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Contact Form */}
                <Card>
                  <CardHeader>
                    <CardTitle>Send us a message</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="First name" />
                      <Input placeholder="Last name" />
                    </div>
                    <Input placeholder="Email address" type="email" />
                    <Input placeholder="Subject" />
                    <textarea 
                      className="w-full min-h-[120px] px-3 py-2 border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md"
                      placeholder="Describe your issue or question..."
                    />
                    <Button className="w-full">Send Message</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
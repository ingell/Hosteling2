import React, { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { ImageWithFallback } from "../../figma/ImageWithFallback";
import { Users, Building2, ArrowRight, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { motion } from "motion/react";

interface LoginFlowProps {
  onLogin: (credentials: { email: string; password: string; type: 'volunteer' | 'hostel' }) => void;
  onBack: () => void;
  onSignupRedirect: () => void;
}

export function LoginFlowPage({ onLogin, onBack, onSignupRedirect }: LoginFlowProps) {
  const [accountType, setAccountType] = useState<'volunteer' | 'hostel' | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountType) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onLogin({ ...credentials, type: accountType });
      setIsLoading(false);
    }, 1000);
  };

  const updateCredentials = (field: string, value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
  };

  if (!accountType) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <div className="border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={onBack}>
                ← Back
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl">Hosteling</span>
              </div>
              <div className="w-16" /> {/* Spacer */}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h1 className="text-3xl mb-4">Welcome back!</h1>
              <p className="text-muted-foreground">
                Choose your account type to continue
              </p>
            </div>

            <div className="space-y-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className="cursor-pointer border-2 hover:border-primary transition-colors"
                  onClick={() => setAccountType('volunteer')}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">I'm a Volunteer</h3>
                        <p className="text-sm text-muted-foreground">
                          Looking for exciting volunteer opportunities
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className="cursor-pointer border-2 hover:border-primary transition-colors"
                  onClick={() => setAccountType('hostel')}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">I'm a Hostel Owner</h3>
                        <p className="text-sm text-muted-foreground">
                          Looking for reliable volunteers to help
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto text-primary"
                  onClick={onSignupRedirect}
                >
                  Sign up here
                </Button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => setAccountType(null)}>
              ← Back
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl">Hosteling</span>
            </div>
            <div className="w-16" /> {/* Spacer */}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                accountType === 'volunteer' 
                  ? 'bg-orange-100 dark:bg-orange-900/20' 
                  : 'bg-blue-100 dark:bg-blue-900/20'
              }`}>
                {accountType === 'volunteer' ? (
                  <Users className={`w-6 h-6 ${accountType === 'volunteer' ? 'text-orange-600' : 'text-blue-600'}`} />
                ) : (
                  <Building2 className={`w-6 h-6 ${accountType === 'volunteer' ? 'text-orange-600' : 'text-blue-600'}`} />
                )}
              </div>
            </div>
            <CardTitle>
              {accountType === 'volunteer' ? 'Volunteer Login' : 'Hostel Login'}
            </CardTitle>
            <p className="text-muted-foreground">
              {accountType === 'volunteer' 
                ? 'Sign in to find your next volunteer adventure'
                : 'Sign in to manage your hostel and volunteers'
              }
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      required
                      value={credentials.email}
                      onChange={(e) => updateCredentials("email", e.target.value)}
                      placeholder="your.email@example.com"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={credentials.password}
                      onChange={(e) => updateCredentials("password", e.target.value)}
                      placeholder="Enter your password"
                      className="pl-10 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="remember" 
                    className="rounded border-input"
                  />
                  <Label htmlFor="remember" className="text-sm">
                    Remember me
                  </Label>
                </div>
                <Button variant="link" className="p-0 h-auto text-sm">
                  Forgot password?
                </Button>
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading || !credentials.email || !credentials.password}
              >
                {isLoading ? "Signing in..." : "Sign In"}
                {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Button
                    type="button"
                    variant="link"
                    className="p-0 h-auto text-primary"
                    onClick={onSignupRedirect}
                  >
                    Sign up here
                  </Button>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
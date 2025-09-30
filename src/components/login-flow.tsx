import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Users, Building2, ArrowRight, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { motion } from "motion/react";

interface LoginFlowProps {
  onLogin: (credentials: { email: string; password: string; type: 'volunteer' | 'hostel' }) => void;
  onBack: () => void;
  onSignupRedirect: () => void;
}

export function LoginFlow({ onLogin, onBack, onSignupRedirect }: LoginFlowProps) {
  const [accountType, setAccountType] = useState<'volunteer' | 'hostel' | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountType || !credentials.email || !credentials.password) return;

    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      onLogin({
        ...credentials,
        type: accountType
      });
      setIsLoading(false);
    }, 1000);
  };

  if (!accountType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <Button variant="ghost" onClick={onBack} className="mb-6">
              ← Back to Home
            </Button>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Choose your account type to sign in
              </p>
            </motion.div>
          </div>

          {/* Account Type Selection */}
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Volunteer Login */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="relative overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-orange-200 group cursor-pointer h-full"
                    onClick={() => setAccountType('volunteer')}>
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">Volunteer Login</CardTitle>
                  <p className="text-muted-foreground text-sm">
                    Access your volunteer profile and browse opportunities
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="relative rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=150&fit=crop"
                      alt="Volunteers"
                      className="w-full h-32 object-cover"
                    />
                    <Badge className="absolute top-2 left-2 bg-orange-500 hover:bg-orange-600">
                      Volunteer
                    </Badge>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
                    onClick={() => setAccountType('volunteer')}
                  >
                    Continue as Volunteer
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Hostel Login */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="relative overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-orange-200 group cursor-pointer h-full"
                    onClick={() => setAccountType('hostel')}>
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">Hostel Login</CardTitle>
                  <p className="text-muted-foreground text-sm">
                    Manage your hostel listings and connect with volunteers
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="relative rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300&h=150&fit=crop"
                      alt="Hostel"
                      className="w-full h-32 object-cover"
                    />
                    <Badge className="absolute top-2 left-2 bg-orange-500 hover:bg-orange-600">
                      Hostel
                    </Badge>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
                    onClick={() => setAccountType('hostel')}
                  >
                    Continue as Hostel
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sign Up Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-8"
          >
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <Button variant="link" onClick={onSignupRedirect} className="p-0 h-auto text-orange-600 hover:text-orange-700 underline">
                Sign up here
              </Button>
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center space-y-4 pb-6">
            <Button variant="ghost" onClick={() => setAccountType(null)} className="self-start p-0 h-auto">
              ← Back
            </Button>
            
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                {accountType === 'volunteer' ? (
                  <Users className="w-6 h-6 text-white" />
                ) : (
                  <Building2 className="w-6 h-6 text-white" />
                )}
              </div>
              <div>
                <CardTitle className="text-2xl">
                  {accountType === 'volunteer' ? 'Volunteer' : 'Hostel'} Login
                </CardTitle>
                <p className="text-muted-foreground text-sm">
                  Sign in to your account
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={credentials.email}
                      onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={credentials.password}
                      onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                      className="pl-10 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <Button variant="link" className="p-0 h-auto text-orange-600 hover:text-orange-700">
                  Forgot password?
                </Button>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
                disabled={isLoading || !credentials.email || !credentials.password}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Button variant="link" onClick={onSignupRedirect} className="p-0 h-auto text-orange-600 hover:text-orange-700 underline">
                  Sign up
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
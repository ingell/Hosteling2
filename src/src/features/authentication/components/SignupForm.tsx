import React, { useState } from "react";
import { Button } from "../../../shared/ui/button";
import { Input } from "../../../shared/ui/input";
import { Label } from "../../../shared/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../shared/ui/card";
import { Alert, AlertDescription } from "../../../shared/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../shared/ui/select";
import { useApp } from "../../../shared/contexts/AppContext";
import { useLanguage } from "../../../shared/contexts/LanguageContext";

export function SignupForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userType: "",
    name: "",
    location: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { signup } = useApp();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError(t("signup.passwordMismatch"));
      return;
    }

    if (!formData.userType) {
      setError(t("signup.selectUserType"));
      return;
    }

    setIsLoading(true);

    try {
      const success = await signup(formData);
      if (!success) {
        setError(t("signup.error"));
      }
    } catch (err) {
      setError(t("signup.error"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{t("signup.title")}</CardTitle>
        <CardDescription>{t("signup.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="userType">{t("signup.userType")}</Label>
            <Select
              value={formData.userType}
              onValueChange={(value) => handleInputChange("userType", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("signup.selectUserType")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="volunteer">
                  {t("common.volunteer")}
                </SelectItem>
                <SelectItem value="hostel">{t("common.hostel")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">{t("common.name")}</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
              placeholder={t("signup.namePlaceholder")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t("common.email")}</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
              placeholder={t("signup.emailPlaceholder")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">{t("common.location")}</Label>
            <Input
              id="location"
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              required
              placeholder={t("signup.locationPlaceholder")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{t("common.password")}</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              required
              placeholder={t("signup.passwordPlaceholder")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">
              {t("signup.confirmPassword")}
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
              required
              placeholder={t("signup.confirmPasswordPlaceholder")}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? t("common.loading") : t("signup.createAccount")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

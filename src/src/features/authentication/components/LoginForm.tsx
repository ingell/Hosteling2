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
import { useApp } from "../../../shared/contexts/AppContext";
import { useLanguage } from "../../../shared/contexts/LanguageContext";
import { Alert, AlertDescription } from "../../../../components/ui/alert";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useApp();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (!success) {
        setError(t("login.invalidCredentials"));
      }
    } catch (err) {
      setError(t("login.error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{t("login.title")}</CardTitle>
        <CardDescription>{t("login.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">{t("common.email")}</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder={t("login.emailPlaceholder")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{t("common.password")}</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder={t("login.passwordPlaceholder")}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? t("common.loading") : t("login.signIn")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/ui/ui/card";
import { Input } from "@/src/ui/ui/input";
import { Button } from "@/src/ui/ui/button";
import { loginAction } from "@/src/actions/auth/login/login";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const result = await loginAction(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-card flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-primary/20 bg-card/50 backdrop-blur">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
            FinTrack
          </CardTitle>
          <CardDescription>
            Sign in to your expense tracking account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/50 border-primary/20"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background/50 border-primary/20"
                required
              />
            </div>
            {error && <div className="text-sm text-destructive">{error}</div>}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-primary to-accent hover:opacity-90"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-primary hover:underline font-medium"
            >
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

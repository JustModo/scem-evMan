"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function VerifyEmailPage() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { signUp, isLoaded } = useSignUp();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isLoaded || !signUp) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        router.push("/auth/login");
      } else {
        setError("Verification failed. Try again.");
      }
    } catch (err: any) {
      const message = err?.errors?.[0]?.message || "Something went wrong.";
      setError(message);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleVerification} className="space-y-4 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center">Verify Your Email</h1>
        <p className="text-muted-foreground text-center">
          We sent a code to <strong>{email}</strong>
        </p>
        <Input
          type="text"
          placeholder="Enter verification code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" className="w-full">
          Verify
        </Button>
      </form>
    </main>
  );
}

"use client"

import type React from "react"

import { useState } from "react"
import { useSignIn } from "@clerk/nextjs"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Mail, Loader2 } from "lucide-react"

interface FormState {
  email: string
  isLoading: boolean
  isComplete: boolean
  error: string
}

export default function ForgotPasswordPage() {
  const [state, setState] = useState<FormState>({
    email: "",
    isLoading: false,
    isComplete: false,
    error: "",
  })

  const { signIn, isLoaded } = useSignIn()

  const updateState = (updates: Partial<FormState>) => {
    setState((prev) => ({ ...prev, ...updates }))
  }

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isLoaded || !signIn) return

    if (!validateEmail(state.email)) {
      updateState({ error: "Please enter a valid email address" })
      return
    }

    updateState({ isLoading: true, error: "" })

    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: state.email,
      })

      updateState({ isComplete: true })
    } catch (err: any) {
      console.error("Password reset error:", err)

      let errorMessage = "An error occurred. Please try again."

      // Handle rate limit errors (plain text responses)
      if (err.message && err.message.includes("Rate exceeded")) {
        errorMessage = "Too many password reset attempts. Please wait a few minutes before trying again."
        updateState({ error: errorMessage, isLoading: false })
        return
      }

      // Handle JSON parsing errors that might contain rate limit info
      if (err.message && err.message.includes("Unexpected token")) {
        errorMessage = "Too many requests. Please wait a moment and try again."
        updateState({ error: errorMessage, isLoading: false })
        return
      }

      // Handle specific error cases from Clerk API
      if (err.errors && err.errors.length > 0) {
        const error = err.errors[0]

        if (
          error.code === "form_identifier_not_found" ||
          error.message?.includes("not found") ||
          error.message?.includes("couldn't find") ||
          error.message?.includes("does not exist")
        ) {
          errorMessage = "This email address is not registered. Please check your email or create an account first."
        } else if (error.code === "too_many_requests" || error.message?.includes("rate")) {
          errorMessage = "Too many password reset attempts. Please wait a few minutes before trying again."
        } else if (error.message) {
          errorMessage = error.message
        }
      } else if (err.message) {
        // Check the main error message as well
        if (
          err.message.includes("not found") ||
          err.message.includes("couldn't find") ||
          err.message.includes("does not exist")
        ) {
          errorMessage = "This email address is not registered. Please check your email or create an account first."
        } else if (err.message.includes("rate") || err.message.includes("limit")) {
          errorMessage = "Too many password reset attempts. Please wait a few minutes before trying again."
        } else {
          errorMessage = err.message
        }
      }

      updateState({ error: errorMessage, isLoading: false })
    } finally {
      updateState({ isLoading: false })
    }
  }

  const handleTryAgain = () => {
    setState({
      email: "",
      isLoading: false,
      isComplete: false,
      error: "",
    })
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    )
  }

  if (state.isComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <Mail className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
            <CardDescription>
              We've sent a password reset code to <span className="font-medium">{state.email}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertDescription>
                Enter the verification code from your email on the reset password page.
              </AlertDescription>
            </Alert>

            <div className="flex flex-col space-y-2">
              <Link href="/auth/reset-password">
                <Button className="w-full">Continue to reset password</Button>
              </Link>

              <Button variant="outline" onClick={handleTryAgain} className="w-full bg-transparent">
                Try a different email
              </Button>

              <Link href="/auth/login">
                <Button variant="ghost" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to sign in
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Forgot your password?</CardTitle>
          <CardDescription className="text-center">
            Enter your email address and we'll send you a verification code to reset your password.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={state.email}
                onChange={(e) => updateState({ email: e.target.value, error: "" })}
                required
                disabled={state.isLoading}
                autoComplete="email"
                className="w-full"
              />
            </div>

            {state.error && (
              <Alert variant="destructive">
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}

            {state.error && state.error.includes("not registered") && (
              <div className="mt-2 text-center">
                <Link href="/auth/register" className="text-sm text-blue-600 hover:text-blue-500 transition-colors">
                  Create an account with this email
                </Link>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={state.isLoading || !state.email.trim()}>
              {state.isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send verification code"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/auth/login"
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

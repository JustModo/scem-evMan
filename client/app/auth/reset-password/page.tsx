"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useSignIn } from "@clerk/nextjs"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, ArrowLeft, Loader2, CheckCircle } from "lucide-react"

interface ResetFormState {
  code: string
  password: string
  confirmPassword: string
  showPassword: boolean
  showConfirmPassword: boolean
  isLoading: boolean
  error: string
  isComplete: boolean
}

export default function ResetPasswordPage() {
  const [state, setState] = useState<ResetFormState>({
    code: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
    isLoading: false,
    error: "",
    isComplete: false,
  })

  const { signIn, isLoaded, setActive } = useSignIn()
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateState = (updates: Partial<ResetFormState>) => {
    setState((prev) => ({ ...prev, ...updates }))
  }

  useEffect(() => {
    // Pre-fill code if provided in URL
    const codeFromUrl = searchParams.get("code")
    if (codeFromUrl) {
      updateState({ code: codeFromUrl })
    }
  }, [searchParams])

  const validatePassword = (password: string): string | null => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long"
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return "Password must contain at least one lowercase letter"
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return "Password must contain at least one uppercase letter"
    }
    if (!/(?=.*\d)/.test(password)) {
      return "Password must contain at least one number"
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isLoaded || !signIn) return

    // Validation
    if (!state.code.trim()) {
      updateState({ error: "Please enter the verification code" })
      return
    }

    const passwordError = validatePassword(state.password)
    if (passwordError) {
      updateState({ error: passwordError })
      return
    }

    if (state.password !== state.confirmPassword) {
      updateState({ error: "Passwords don't match" })
      return
    }

    updateState({ isLoading: true, error: "" })

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: state.code,
        password: state.password,
      })

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId })
        updateState({ isComplete: true })

        // Redirect to login page after a short delay
        setTimeout(() => {
          router.push("/auth/login")
        }, 2000)
      }
    } catch (err: any) {
      console.error("Reset password error:", err)

      const errorMessage = err.errors?.[0]?.message || "An error occurred. Please try again."

      if (errorMessage.includes("invalid") || errorMessage.includes("incorrect")) {
        updateState({ error: "Invalid verification code. Please check your email and try again." })
      } else if (errorMessage.includes("expired")) {
        updateState({ error: "Verification code has expired. Please request a new one." })
      } else {
        updateState({ error: errorMessage })
      }
    } finally {
      updateState({ isLoading: false })
    }
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
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Password Reset Successful!</CardTitle>
            <CardDescription>
              Your password has been successfully reset. You can now sign in with your new password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/auth/login")} className="w-full">
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Reset Your Password</CardTitle>
          <CardDescription className="text-center">
            Enter the verification code from your email and choose a new password.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Verification Code</Label>
              <Input
                id="code"
                type="text"
                placeholder="Enter the 6-digit code"
                value={state.code}
                onChange={(e) => updateState({ code: e.target.value.replace(/\D/g, "").slice(0, 6), error: "" })}
                required
                disabled={state.isLoading}
                autoComplete="one-time-code"
                maxLength={6}
                className="text-center text-lg tracking-widest"
              />
              <p className="text-xs text-gray-500">Check your email for the verification code</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={state.showPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  value={state.password}
                  onChange={(e) => updateState({ password: e.target.value, error: "" })}
                  required
                  disabled={state.isLoading}
                  autoComplete="new-password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => updateState({ showPassword: !state.showPassword })}
                  disabled={state.isLoading}
                >
                  {state.showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span className="sr-only">{state.showPassword ? "Hide password" : "Show password"}</span>
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                Must be at least 8 characters with uppercase, lowercase, and numbers
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={state.showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your new password"
                  value={state.confirmPassword}
                  onChange={(e) => updateState({ confirmPassword: e.target.value, error: "" })}
                  required
                  disabled={state.isLoading}
                  autoComplete="new-password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => updateState({ showConfirmPassword: !state.showConfirmPassword })}
                  disabled={state.isLoading}
                >
                  {state.showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span className="sr-only">{state.showConfirmPassword ? "Hide password" : "Show password"}</span>
                </Button>
              </div>
            </div>

            {state.error && (
              <Alert variant="destructive">
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={state.isLoading || !state.code || !state.password || !state.confirmPassword}
            >
              {state.isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resetting Password...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Reset Password
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <Link href="/auth/forgot-password">
              <Button variant="ghost" className="text-sm text-blue-600 hover:text-blue-500 transition-colors">
                Didn't receive a code? Send again
              </Button>
            </Link>

            <div>
              <Link href="/auth/login">
                <Button variant="ghost" className="text-sm text-blue-600 hover:text-blue-500 transition-colors">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to sign in
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

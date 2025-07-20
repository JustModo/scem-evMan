"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { useSignIn } from "@clerk/nextjs"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FcGoogle } from "react-icons/fc"
import { MdEmail } from "react-icons/md"
import { RiLockPasswordFill } from "react-icons/ri"
import { Loader2 } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({ email: "", password: "" })
  const [ssoError, setSsoError] = useState("")
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [isEmailPasswordLoading, setIsEmailPasswordLoading] = useState(false)
  const { signIn, isLoaded } = useSignIn()
  const searchParams = useSearchParams()

  // Check for SSO errors
  useEffect(() => {
    const error = searchParams.get("error")
    if (error === "sso_failed") {
      setSsoError("Authentication failed. Please try again.")
    }
  }, [searchParams])

  const validateForm = () => {
    const newErrors = { email: "", password: "" }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email."
    }
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters."
    }

    setErrors(newErrors)
    return !newErrors.email && !newErrors.password
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm() || !isLoaded) return

    setIsEmailPasswordLoading(true)
    setErrors({ email: "", password: "" })

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      })

      if (result.status === "complete") {
        window.location.href = "/"
      }
    } catch (err: any) {
      console.error("Login error:", err)

      // Handle specific Clerk errors
      const errorCode = err.errors?.[0]?.code
      const errorMessage = err.errors?.[0]?.message || "Login failed"

      if (errorCode === "form_identifier_not_found") {
        setErrors((prev) => ({
          ...prev,
          email: "No account found with this email address.",
        }))
      } else if (errorCode === "form_password_incorrect") {
        setErrors((prev) => ({
          ...prev,
          password: "Incorrect password.",
        }))
      } else if (errorCode === "strategy_for_user_invalid" || errorMessage.includes("verification strategy")) {
        setErrors((prev) => ({
          ...prev,
          password: "Email exists but no password set. Sign in with Google or click Forgot Password to set one.",
        }))
      } else if (errorCode === "session_exists") {
        // User is already signed in
        window.location.href = "/"
      } else {
        setErrors((prev) => ({
          ...prev,
          password: errorMessage,
        }))
      }
    } finally {
      setIsEmailPasswordLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    if (!isLoaded || isGoogleLoading) return

    setIsGoogleLoading(true)
    setSsoError("")

    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/auth/sso-callback?from=login",
        redirectUrlComplete: "/",
      })
    } catch (err: any) {
      console.error("Google sign-in failed", err)

      const errorMessage = err.errors?.[0]?.message || err.message || "Failed to initiate Google sign-in"

      if (errorMessage.includes("rate") || errorMessage.includes("limit")) {
        setSsoError("Too many requests. Please wait a moment and try again.")
      } else if (errorMessage.includes("oauth")) {
        setSsoError("OAuth configuration error. Please contact support.")
      } else {
        setSsoError("Failed to initiate Google sign-in. Please try again.")
      }
    } finally {
      setIsGoogleLoading(false)
    }
  }

  return (
    <main className="h-screen flex items-center justify-center p-0">
      <div className="grid w-full h-full grid-cols-1 md:grid-cols-2">
        <div className="bg-primary flex items-center justify-center" />
        <div className="bg-background flex items-center justify-center px-4 sm:px-10 py-8">
          <div className="w-full max-w-sm space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">LOGIN</h1>
              <div className="h-1 w-24 bg-primary rounded-full" />
            </div>

            {ssoError && (
              <Alert variant="destructive">
                <AlertDescription>{ssoError}</AlertDescription>
              </Alert>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <div className="relative">
                  <MdEmail
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    size={20}
                  />
                  <Input
                    className="pl-12 pr-4 py-3 bg-muted text-foreground rounded-md"
                    type="email"
                    placeholder="E-Mail ID"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <RiLockPasswordFill
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    size={20}
                  />
                  <Input
                    className="pl-12 pr-4 py-3 bg-muted text-foreground rounded-md"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
              </div>

              <div id="clerk-captcha"></div>

              <div className="text-right mt-2">
                <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isEmailPasswordLoading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-3"
              >
                {isEmailPasswordLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Signing in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>

              <div className="text-center">
                <span className="text-sm text-muted-foreground">New user? </span>
                <Link href="/auth/register" className="text-sm text-primary hover:underline">
                  Sign Up
                </Link>
              </div>

              <div className="flex items-center my-6">
                <hr className="flex-grow border-muted" />
                <span className="px-4 text-sm text-muted-foreground">OR</span>
                <hr className="flex-grow border-muted" />
              </div>

              <Button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading}
                className="flex items-center justify-center w-full gap-3 bg-background border-2 border-input text-foreground rounded-md py-3 hover:bg-accent disabled:opacity-50"
                variant="outline"
              >
                {isGoogleLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <FcGoogle size={20} />
                    Continue With Google
                  </>
                )}
              </Button>
            </form>

            <p className="text-xs text-muted-foreground text-center">©2025 All rights reserved</p>
          </div>
        </div>
      </div>
    </main>
  )
}

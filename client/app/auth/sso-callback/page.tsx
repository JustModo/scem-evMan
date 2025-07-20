"use client"

import { useEffect, useState } from "react"
import { useSignIn, useSignUp, useUser } from "@clerk/nextjs"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, UserX, CheckCircle } from "lucide-react"

export default function SSOCallback() {
  const [status, setStatus] = useState<"loading" | "new_user" | "existing_user" | "error">("loading")
  const [error, setError] = useState("")

  const { signIn, isLoaded: signInLoaded } = useSignIn()
  const { signUp, isLoaded: signUpLoaded } = useSignUp()
  const { user } = useUser()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleCallback = async () => {
      if (!signInLoaded || !signUpLoaded) return

      try {
        // Check if we have a sign-in attempt first
        if (signIn?.firstFactorVerification?.status === "transferable") {
          // This means the user exists and we can complete sign-in
          const result = await signIn.create({ transfer: true })

          if (result.status === "complete") {
            setStatus("existing_user")
            setTimeout(() => router.push("/"), 2000)
            return
          }
        }

        // Check if we have a sign-up attempt
        if (signUp?.verifications?.externalAccount?.status === "transferable") {
          // This is a new user trying to sign up
          const result = await signUp.create({ transfer: true })

          if (result.status === "complete") {
            setStatus("existing_user")
            setTimeout(() => router.push("/"), 2000)
            return
          }
        }

        // If neither worked, check if user came from login page
        const fromLogin = searchParams.get("from") === "login"

        if (fromLogin) {
          // User tried to login but account doesn't exist
          setStatus("new_user")
        } else {
          // Default to error state
          setStatus("error")
          setError("Authentication failed. Please try again.")
        }
      } catch (err: any) {
        console.error("SSO Callback error:", err)

        // Check if error indicates user doesn't exist
        if (err.errors?.[0]?.code === "form_identifier_not_found" || err.errors?.[0]?.message?.includes("not found")) {
          setStatus("new_user")
        } else {
          setStatus("error")
          setError(err.errors?.[0]?.message || "Authentication failed. Please try again.")
        }
      }
    }

    handleCallback()
  }, [signInLoaded, signUpLoaded, signIn, signUp, router, searchParams])

  const handleSignUp = () => {
    router.push("/auth/register")
  }

  const handleBackToLogin = () => {
    router.push("/auth/login")
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Authenticating...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (status === "existing_user") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Welcome Back!</CardTitle>
            <CardDescription>You have been successfully signed in. Redirecting to home page...</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  if (status === "new_user") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
              <UserX className="h-6 w-6 text-orange-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Account Not Found</CardTitle>
            <CardDescription>
              We couldn't find an account associated with this Google account. Please sign up first to create your
              account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertDescription>You need to create an account before you can sign in with Google.</AlertDescription>
            </Alert>

            <div className="flex flex-col space-y-2">
              <Button onClick={handleSignUp} className="w-full">
                Create Account
              </Button>

              <Button variant="outline" onClick={handleBackToLogin} className="w-full bg-transparent">
                Back to Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Authentication Error</CardTitle>
            <CardDescription>Something went wrong during authentication.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>

            <div className="flex flex-col space-y-2">
              <Button onClick={handleBackToLogin} className="w-full">
                Back to Login
              </Button>

              <Button variant="outline" onClick={handleSignUp} className="w-full bg-transparent">
                Create Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return null
}

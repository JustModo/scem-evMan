import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher(["/", "/api/webhooks(.*)", "/auth(.*)"])

// Define auth routes that authenticated users should be redirected away from
const isAuthRoute = createRouteMatcher([
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/reset-password",
])

export default clerkMiddleware(async (auth, request) => {
  try {
    // Get auth state
    const { userId } = await auth()

    // If user is authenticated and trying to access auth pages, redirect to home page
    if (userId && isAuthRoute(request)) {
      const homeUrl = new URL("/", request.url)
      return NextResponse.redirect(homeUrl)
    }

    // Protect all non-public routes
    if (!isPublicRoute(request)) {
      await auth.protect()
    }

    return NextResponse.next()
  } catch (error) {
    console.error("Middleware error:", error)

    // If there's an error with auth, redirect to login for protected routes
    if (!isPublicRoute(request)) {
      const loginUrl = new URL("/auth/login", request.url)
      return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}

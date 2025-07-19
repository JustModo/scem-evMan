import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SSOCallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
        <p className="text-muted-foreground">Redirecting...</p>
      </div>
      <div className="hidden">
        <AuthenticateWithRedirectCallback />
      </div>
    </div>
  );
}

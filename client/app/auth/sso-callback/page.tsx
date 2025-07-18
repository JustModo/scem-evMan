import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";

export default function SSOCallback() {
  return (
    <>
      <SignedIn>
        {/* If user is signed in after OAuth, redirect manually */}
        <script dangerouslySetInnerHTML={{
          __html: `
            window.location.href = "/dashboard";
          `,
        }} />
      </SignedIn>

      <SignedOut>
        {/* If something went wrong */}
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

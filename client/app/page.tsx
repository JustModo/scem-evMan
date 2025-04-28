import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

// Landing Page
// Landing page for the platform. Highlight purpose, CTA for login or join contest.
export default function LandingPage() {
  return (
    <div>
      LandingPage Screen
      <Button>
        <Link href={"/admin"}>Admin</Link>
      </Button>
      <Button>
        <Link href={"/test/1"}>Tests</Link>
      </Button>
    </div>
  );
}

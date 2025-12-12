"use client";

import { Suspense } from "react";
import BusinessOnboardingContent from "@/src/components/onboarding/BusinessOnboardingContent";

export default function BusinessOnboardingPage() {
  return (
    <Suspense fallback={<div className="text-white p-6">Loading...</div>}>
      <BusinessOnboardingContent />
    </Suspense>
  );
}

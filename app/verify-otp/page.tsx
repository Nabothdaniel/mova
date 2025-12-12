"use client";

import { Suspense } from "react";
import VerifyOtpPageContent from "@/src/pages/OtpPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtpPageContent />
    </Suspense>
  );
}

"use client";

import { Suspense } from "react";
import RegisterPage from "@/src/pages/RegisterPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterPage />
    </Suspense>
  );
}

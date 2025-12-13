"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import RoleSelectionOverlay from "@/src/components/register/RoleSelectionOverlay";
import BusinessForm from "@/src/components/register/BusinessForm";
import ParticipantForm from "@/src/components/register/ParticipantForm";

export default function RegisterPage() {
  const searchParams = useSearchParams();
 const initialRole = searchParams?.get("role") ?? null;
const [role, setRole] = useState<string | null>(initialRole);

  // Show overlay if no role
  if (!role) return <RoleSelectionOverlay onSelectRole={setRole} />;

  // Render the correct form based on role
  return role === "business" ? (
    <BusinessForm />
  ) : (
    <ParticipantForm />
  );
}

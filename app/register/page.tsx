"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import RoleSelectionOverlay from "./components/RoleSelectionOverlay";
import BusinessForm from "./components/BusinessForm";
import ParticipantForm from "./components/ParticipantForm";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role");
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

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useRegisterParticipant } from "@/src/hooks/useParticipantsAuth";
import { fetchCampaigns } from "@/src/services/api/campaigns"; 

export default function ParticipantForm() {
  const router = useRouter();
  const registerParticipant = useRegisterParticipant();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [campaigns, setCampaigns] = useState<{ id: string; name: string }[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState("");

  useEffect(() => {
    fetchCampaigns()
      .then((res) => setCampaigns(res))
      .catch(() => toast.error("Failed to load campaigns"));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return toast.error("Passwords do not match!");
    if (!selectedCampaign) return toast.error("Please select a campaign");

    registerParticipant.mutate(
      { ...form, campaignId: selectedCampaign },
      {
        onSuccess: () => {
          toast.success("Participant account created! Verify your email.");
          router.push(`/verify-email?email=${form.email}&role=participant`);
        },
        onError: (err: any) => toast.error(err?.response?.data?.message || "Signup failed"),
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 mt-8 max-w-md mx-auto">
      {/* Name */}
      <input
        type="text"
        placeholder="Full Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
        required
      />

      {/* Email */}
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
        required
      />

      {/* Password */}
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
        required
      />

      {/* Confirm Password */}
      <input
        type="password"
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
        required
      />

      {/* Campaign Dropdown */}
      <select
        value={selectedCampaign}
        onChange={(e) => setSelectedCampaign(e.target.value)}
        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
        required
      >
        <option value="">-- Select a Campaign --</option>
        {campaigns.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="w-full bg-orange-500 text-white py-3 rounded-lg"
      >
        Continue
      </button>
    </form>
  );
}

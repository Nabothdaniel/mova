"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useRegisterParticipant } from "@/src/hooks/useParticipantsAuth";
import { usePublicCampaigns } from "@/src/hooks/useCampaigns";

export default function ParticipantRegisterPage() {
    const router = useRouter();
    const registerParticipant = useRegisterParticipant();
    const { data: campaigns = [], isLoading, isError } = usePublicCampaigns();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [selectedCampaign, setSelectedCampaign] = useState("");

    useEffect(() => {
        if (isError) toast.error("Failed to load campaigns");
    }, [isError]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) return toast.error("Passwords do not match!");
        if (!selectedCampaign) return toast.error("Please select a campaign");

        registerParticipant.mutate(
            { ...form, campaignId: selectedCampaign },
            {
                onSuccess: () => {
                    toast.success("Participant account created! Verify your email.");
                    router.push(`/verify-otp?email=${form.email}&role=participant`);
                },
                onError: (err: any) => toast.error(err?.response?.data?.message || "Signup failed"),
            }
        );
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-0 bg-white rounded-3xl overflow-hidden shadow-2xl">

                {/* Left Side */}
                <div className="bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 p-8 lg:p-12 flex flex-col justify-center text-white">
                    <h1 className="text-5xl font-bold mb-6">Welcome Participant</h1>
                    <p className="text-white/90 text-lg">
                        Join a campaign and be part of something great.
                    </p>
                </div>

                {/* Right Side */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="max-w-md mx-auto w-full">
                        <h2 className="text-3xl font-bold mb-6">Participant Registration</h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                required
                            />

                            <input
                                type="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                required
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                required
                            />

                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={form.confirmPassword}
                                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                required
                            />

                            <select
                                value={selectedCampaign}
                                onChange={(e) => setSelectedCampaign(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                required
                            >
                                <option value="">-- Select a Campaign --</option>
                                {isLoading
                                    ? <option>Loading campaigns...</option>
                                    : campaigns.map((c) => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))
                                }
                            </select>

                            <button
                                type="submit"
                                disabled={registerParticipant.isPending}
                                className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
                            >
                                {registerParticipant.isPending ? "Creating account..." : "Continue"}
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}

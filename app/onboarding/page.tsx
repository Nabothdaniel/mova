"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useOnboardingBusiness } from "@/src/hooks/useBusinessAuth";
import { useCategories, useSubcategories } from "@/src/hooks/useCategories";
import { useSectors } from "@/src/hooks/useSectors";

export default function BusinessOnboardingPage() {
    const router = useRouter();
    const params = useSearchParams();

    const businessId = params.get("businessId");
    const email = params.get("email");

    const onboarding = useOnboardingBusiness();

    const [form, setForm] = useState({
        phone: "",
        address: "",
        sectorId: "",
        categoryId: "",
        subCategoryId: "",
        website: "",
        socialMedia: { facebook: "" },
        referralCapacity: "",
    });

    // Fetch sectors
    const { data: sectors = [] } = useSectors();

    // Fetch categories
    const { data: categories = [] } = useCategories();

    // Fetch subcategories whenever categoryId changes
    const { data: subcategories = [] } = useSubcategories(form.categoryId);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!businessId) return toast.error("Missing business ID from signup");

        onboarding.mutate(
            { ...form, businessId },
            {
                onSuccess: () => {
                    toast.success("Onboarding completed! Verify your email OTP.");
                    router.push(`/verify-otp?email=${email}`);
                },
                onError: (err: any) => {
                    toast.error(err?.response?.data?.message || "Onboarding failed. Try again.");
                },
            }
        );
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-0 bg-white rounded-3xl overflow-hidden shadow-2xl">
                {/* Left Side - Hero Section */}
                <div className="bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 p-8 lg:p-12 flex flex-col justify-between text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full -ml-48 -mb-48"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-12">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
                            </div>
                            <span className="text-2xl font-bold">ninth</span>
                        </div>

                        <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                            <span className="text-sm font-medium">Complete your business profile</span>
                        </div>

                        <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">Onboarding</h1>
                        <p className="text-lg text-white/90 mb-12">Fill in your business details to get started.</p>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="p-8 lg:p-12 flex flex-col justify-center overflow-y-auto max-h-screen">
                    <div className="max-w-md mx-auto w-full">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <h2 className="text-2xl font-bold mb-4 text-orange-600">Business Onboarding</h2>

                            {/* Phone */}
                            <input
                                placeholder="Phone"
                                required
                                value={form.phone}
                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                            />

                            {/* Address */}
                            <input
                                placeholder="Address"
                                required
                                value={form.address}
                                onChange={(e) => setForm({ ...form, address: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                            />

                            {/* Sector Dropdown */}
                            <select
                                value={form.sectorId}
                                onChange={(e) => setForm({ ...form, sectorId: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                                required
                            >
                                <option value="">Select Sector</option>
                                {sectors.map((sector) => (
                                    <option key={sector.id} value={sector.id}>
                                        {sector.name}
                                    </option>
                                ))}
                            </select>

                            {/* Category Dropdown */}
                            <select
                                value={form.categoryId}
                                onChange={(e) => setForm({ ...form, categoryId: e.target.value, subCategoryId: "" })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                                required
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>

                            {/* Subcategory Dropdown */}
                            <select
                                value={form.subCategoryId}
                                onChange={(e) => setForm({ ...form, subCategoryId: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                                disabled={!form.categoryId || !subcategories.length}
                                required
                            >
                                <option value="">Select Subcategory</option>
                                {subcategories.map((sub) => (
                                    <option key={sub.id} value={sub.id}>
                                        {sub.name}
                                    </option>
                                ))}
                            </select>

                            {/* Website */}
                            <input
                                placeholder="Website (optional)"
                                value={form.website}
                                onChange={(e) => setForm({ ...form, website: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                            />

                            {/* Facebook */}
                            <input
                                placeholder="Facebook URL (optional)"
                                value={form.socialMedia.facebook}
                                onChange={(e) =>
                                    setForm({ ...form, socialMedia: { facebook: e.target.value } })
                                }
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                            />

                            {/* Referral Capacity */}
                            <input
                                placeholder="Referral Capacity"
                                value={form.referralCapacity}
                                onChange={(e) => setForm({ ...form, referralCapacity: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                            />

                            <button
                                type="submit"
                                disabled={onboarding.isPending}
                                className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition shadow-lg shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {onboarding.isPending ? "Submitting..." : "Complete Onboarding"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
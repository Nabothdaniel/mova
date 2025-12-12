"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { useRegisterBusiness } from "@/src/hooks/useBusinessAuth";

export default function BusinessForm() {
  const router = useRouter();
  const registerBusiness = useRegisterBusiness();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) return toast.error("Passwords do not match!");

    registerBusiness.mutate(form, {
      onSuccess: (data: any) => {
        toast.success("Signup successful! Proceed to onboarding.");
        router.push(`/onboarding?businessId=${data?.id}&email=${form.email}`);
      },
      onError: (err: any) => toast.error(err?.response?.data?.message || "Signup failed"),
    });
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
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 pr-12"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {/* Confirm Password */}
      <div className="relative">
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 pr-12"
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
        >
          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {/* Referral Code */}
      <input
        type="text"
        placeholder="Referral Code (Optional)"
        value={form.referralCode}
        onChange={(e) => setForm({ ...form, referralCode: e.target.value })}
        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
      />

      <button
        type="submit"
        disabled={registerBusiness.isPending}
        className="w-full bg-orange-500 text-white py-3 rounded-lg"
      >
        {registerBusiness.isPending ? "Creating account..." : "Continue"}
      </button>
    </form>
  );
}

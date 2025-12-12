"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { useRegisterBusiness } from "@/src/hooks/useBusinessAuth";

export default function BusinessRegisterPage() {
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
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-0 bg-white rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Left Side */}
        <div className="bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 p-8 lg:p-12 flex flex-col justify-center text-white">
          <h1 className="text-5xl font-bold mb-6">Welcome Business Owner</h1>
          <p className="text-white/90 text-lg">
            Sign up your business and start your journey today.
          </p>
        </div>

        {/* Right Side */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <h2 className="text-3xl font-bold mb-6">Business Registration</h2>

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

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 pr-12"
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

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 pr-12"
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

              <input
                type="text"
                placeholder="Referral Code (Optional)"
                value={form.referralCode}
                onChange={(e) => setForm({ ...form, referralCode: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />

              <button
                type="submit"
                disabled={registerBusiness.isPending}
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
              >
                {registerBusiness.isPending ? "Creating account..." : "Continue"}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

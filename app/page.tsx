"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { useLogin } from "@/src/hooks/useLogin";

export default function LoginPage() {
  const router = useRouter();
  const login = useLogin();

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    login.mutate(form, {
      onSuccess(data) {
        toast.success("Login successful");


        // Store tokens
        localStorage.setItem("access_token", data.accessToken);
        localStorage.setItem("refresh_token", data.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Role-based redirect
        const role = data.user.role;

        if (role === "Admin") {
          router.push("/admin/dashboard");
          return;
        }

        if (role === "Business") {
          if (!data.user.isOnboarded) {
            router.push(`/onboarding?email=${form.email}`);
          } else {
            router.push("/business/dashboard");
          }
          return;
        }

        if (role === "Staff") {
          router.push("/staff/home");
          return;
        }

        router.push("/participant/home");
      },
      onError(err) {
        toast.error(err?.response?.data?.message || "Invalid login credentials");
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-0 bg-white rounded-3xl overflow-hidden shadow-2xl">

        {/* Left Side */}
        <div className="bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 p-8 lg:p-12 flex flex-col justify-center text-white">
          <h1 className="text-5xl font-bold mb-6">Welcome Back</h1>
          <p className="text-white/90 text-lg">
            Enter your credentials to continue your journey.
          </p>
        </div>

        {/* Right Side */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <h2 className="text-3xl font-bold mb-6">Login</h2>

            <form onSubmit={handleSubmit} className="space-y-5">

              <input
                type="text"
                placeholder="Email or Username"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <button
                type="submit"
                disabled={login.isPending}
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
              >
                {login.isPending ? "Signing in..." : "Login"}
              </button>
            </form>

            {/* Register + Forgot Password */}
            <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
              <button
                onClick={() => router.push("/register")}
                className="hover:text-orange-600 font-medium"
              >
                Create an Account
              </button>

              <button
                onClick={() => router.push("/forgot-password")}
                className="hover:text-orange-600 font-medium"
              >
                Forgot Password?
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

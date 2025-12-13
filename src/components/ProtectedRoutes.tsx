// src/components/ProtectedRoute.tsx
import { ReactNode } from 'react';
import { useAuth } from "@/src/providers/AuthProviders";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <div>Unauthorized access</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
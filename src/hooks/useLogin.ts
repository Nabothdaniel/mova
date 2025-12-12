import { useMutation } from "@tanstack/react-query";
import { login, LoginPayload, LoginResponse } from "@/src/services/api/auth";

export function useLogin() {
  return useMutation<LoginResponse, any, LoginPayload>({
    mutationFn: login,
  });
}

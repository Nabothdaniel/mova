import { useMutation } from "@tanstack/react-query";
import { registerParticipant } from "@/src/services/api/participants";

export function useRegisterParticipant() {
  return useMutation({
    mutationFn: registerParticipant,
  });
}

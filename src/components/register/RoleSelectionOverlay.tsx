interface RoleSelectionOverlayProps {
  onSelectRole: (role: string) => void;
}

export default function RoleSelectionOverlay({ onSelectRole }: RoleSelectionOverlayProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-lg max-w-md w-full shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Choose Your Account Type</h2>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => onSelectRole("business")}
            className="w-full py-3 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
          >
            Business
          </button>
          <button
            onClick={() => onSelectRole("participant")}
            className="w-full py-3 bg-gray-200 rounded hover:bg-gray-300 transition"
          >
            Participant
          </button>
        </div>
      </div>
    </div>
  );
}

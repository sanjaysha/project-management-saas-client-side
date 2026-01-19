import { useState } from "react";
import Input from "./Input";
import Button from "./Button";

export default function InviteMemberModal({ open, onClose, onInvite }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("MEMBER");

  if (!open) return null;

  const handleInvite = () => {
    if (!email.trim()) return;
    onInvite({ email, role });
    setEmail("");
    setRole("MEMBER");
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Invite Member</h2>

        <div className="space-y-4">
          <Input
            label="Member Email"
            placeholder="user@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div>
            <label className="text-sm text-gray-700">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm mt-1"
            >
              <option value="ADMIN">ADMIN</option>
              <option value="MANAGER">MANAGER</option>
              <option value="MEMBER">MEMBER</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200"
            onClick={onClose}
          >
            Cancel
          </button>

          <Button onClick={handleInvite}>Send Invite</Button>
        </div>
      </div>
    </div>
  );
}

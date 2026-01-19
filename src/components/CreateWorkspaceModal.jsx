import { useState } from "react";
import Input from "./Input";
import Button from "./Button";

export default function CreateWorkspaceModal({ open, onClose, onCreate }) {
  const [name, setName] = useState("");

  if (!open) return null;

  const handleCreate = () => {
    console.log(name, "NAAAME");
    if (!name.trim()) return;
    console.log("Calling onCreate", onCreate);

    onCreate({ name });
    setName("");
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Create Workspace</h2>

        <Input
          label="Workspace Name"
          value={name}
          placeholder="e.g. Team Alpha"
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200"
            onClick={onClose}
          >
            Cancel
          </button>

          <Button onClick={handleCreate}>Create</Button>
        </div>
      </div>
    </div>
  );
}

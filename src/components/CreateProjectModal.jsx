import { useState } from "react";
import Input from "./Input";
import Button from "./Button";

export default function CreateProjectModal({ open, onClose, onCreate }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  if (!open) return null;

  const handleCreate = () => {
    if (!name.trim()) return;
    onCreate({ name, description });
    setName("");
    setDescription("");
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Create Project</h2>

        <div className="space-y-4">
          <Input
            label="Project Name"
            value={name}
            placeholder="e.g. Mobile App"
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            label="Description (optional)"
            value={description}
            placeholder="Short project description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

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

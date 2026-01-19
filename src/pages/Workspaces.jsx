import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { getWorkspaces, createWorkspace } from "../api/workspace.api";
import CreateWorkspaceModal from "../components/CreateWorkspaceModal";
import { useNavigate } from "react-router-dom";

export default function Workspaces() {
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadWorkspaces();
  }, []);

  const loadWorkspaces = async () => {
    try {
      const res = await getWorkspaces();
      setWorkspaces(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async ({ name }) => {
    console.log(name, "NAME");
    const res = await createWorkspace({ name });

    // Add the new workspace to the list
    setWorkspaces((prev) => [...prev, res.data.data]);

    setModalOpen(false);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-gray-500">Loading workspaces...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Your Workspaces</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700"
        >
          + New Workspace
        </button>
      </div>

      {/* Grid Workspace List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {workspaces.map(({ workspaceId }) => (
          <div
            key={workspaceId._id}
            onClick={() => navigate(`/projects?workspaceId=${workspaceId._id}`)}
            className="
              p-6 bg-white rounded-xl border shadow-sm hover:shadow 
              hover:border-gray-300 cursor-pointer transition
            "
          >
            <h3 className="text-lg font-medium text-gray-900">
              {workspaceId.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">Click to view projects</p>
          </div>
        ))}
      </div>

      <CreateWorkspaceModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreate}
      />
    </DashboardLayout>
  );
}

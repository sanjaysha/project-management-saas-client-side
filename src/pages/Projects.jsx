import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import { getProjects, createProject } from "../api/project.api";
import { inviteWorkspaceMember } from "../api/workspace.api";
import CreateProjectModal from "../components/CreateProjectModal";
import InviteMemberModal from "../components/InviteMemberModal";
import { useAuth } from "../auth/AuthProvider";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);

  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const workspaceId = params.get("workspaceId");

  useEffect(() => {
    if (workspaceId) {
      loadProjects();
    }
  }, [workspaceId]);

  const loadProjects = async () => {
    try {
      const res = await getProjects(workspaceId);
      setProjects(res.data.data.items);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async ({ name, description }) => {
    const res = await createProject({
      workspaceId,
      name,
      description,
    });

    setProjects((prev) => [...prev, res.data.data]);
    setModalOpen(false);
  };

  const handleInvite = async ({ email, role }) => {
    try {
      await inviteWorkspaceMember({
        workspaceId,
        email,
        role,
      });

      alert("Member invited successfully!");
      setInviteOpen(false);
    } catch (error) {
      console.error(error);
      alert("Failed to invite member.");
    }
  };

  if (!workspaceId) {
    return (
      <DashboardLayout>
        <p className="text-gray-500">Select a workspace to view projects.</p>
      </DashboardLayout>
    );
  }

  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-gray-500">Loading projects...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Projects</h1>

        <div className="flex gap-3">
          {/* Invite Member Button */}
          <button
            onClick={() => setInviteOpen(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700"
          >
            + Invite Member
          </button>

          {/* Create Project Button */}
          {(user?.role === "ADMIN" || user?.role === "MANAGER") && (
            <button
              onClick={() => setModalOpen(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700"
            >
              + New Project
            </button>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            onClick={() =>
              navigate(
                `/board?workspaceId=${workspaceId}&projectId=${project._id}`,
              )
            }
            className="
              p-6 bg-white rounded-xl border shadow-sm hover:shadow
              hover:border-gray-300 cursor-pointer transition
            "
          >
            <h3 className="text-lg font-medium text-gray-900">
              {project.name}
            </h3>
            {project.description && (
              <p className="text-sm text-gray-500 mt-2">
                {project.description}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Create Project Modal */}
      <CreateProjectModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreate}
      />

      {/* Invite Member Modal */}
      <InviteMemberModal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        onInvite={handleInvite}
      />
    </DashboardLayout>
  );
}

import api from "./axios";

export const getTasksByProject = (workspaceId, projectId) =>
  api.get("/tasks", {
    params: { workspaceId, projectId },
  });

export const createTask = (data) => api.post("/tasks", data);

export const updateTaskStatus = ({ taskId, workspaceId, status, position }) =>
  api.patch(`/tasks/${taskId}/status`, {
    workspaceId,
    status,
    position,
  });

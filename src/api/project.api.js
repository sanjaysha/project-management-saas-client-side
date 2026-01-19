import api from "./axios";

export const getProjects = (workspaceId, page = 1, limit = 20) =>
  api.get("/projects", {
    params: { workspaceId, page, limit },
  });

export const createProject = (data) => api.post("/projects", data);

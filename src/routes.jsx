import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Workspaces from "./pages/Workspaces";
import Projects from "./pages/Projects";
import Board from "./pages/Board";
// import ActivityLog from "./pages/ActivityLog";
import ProtectedRoute from "./auth/ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Workspaces />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/board"
          element={
            <ProtectedRoute>
              <Board />
            </ProtectedRoute>
          }
        />

        {/* <Route
          path="/activities"
          element={
            <ProtectedRoute>
              <ActivityLog />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

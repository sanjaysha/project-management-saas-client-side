import AppRoutes from "./routes";
import { AuthProvider } from "./auth/AuthProvider";

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

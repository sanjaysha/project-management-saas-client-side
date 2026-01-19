import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser, logoutUser } from "../api/auth.api";
import {
  saveTokens,
  clearTokens,
  getRefreshToken,
  getAccessToken,
} from "../utils/token";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true); // ✅ IMPORTANT

  // Restore auth on refresh
  useEffect(() => {
    const accessToken = getAccessToken();

    if (!accessToken) {
      setAuthLoading(false);
      return;
    }

    try {
      const payload = JSON.parse(atob(accessToken.split(".")[1]));

      setUser({
        userId: payload.userId,
        email: payload.email,
        role: payload.role,
      });
    } catch (err) {
      console.error("Invalid token");
      clearTokens();
    } finally {
      setAuthLoading(false); // ✅ auth restoration complete
    }
  }, []);

  const login = async (data) => {
    const res = await loginUser(data);
    const { accessToken, refreshToken, user: userInfo } = res.data.data;

    saveTokens({ accessToken, refreshToken });
    setUser(userInfo);
  };

  const register = async (data) => {
    const res = await registerUser(data);
    const { accessToken, refreshToken, user: userInfo } = res.data.data;

    saveTokens({ accessToken, refreshToken });
    setUser(userInfo);
  };

  const logout = async () => {
    const refresh = getRefreshToken();
    if (refresh) {
      await logoutUser(refresh);
    }
    clearTokens();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authLoading, // ✅ expose this
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

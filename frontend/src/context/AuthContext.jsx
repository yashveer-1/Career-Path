import { createContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService.js";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(authService.getStoredUser);
  const [loading, setLoading] = useState(Boolean(authService.getToken()));

  useEffect(() => {
    let active = true;

    async function restoreSession() {
      if (!authService.getToken()) {
        setLoading(false);
        return;
      }

      try {
        const user = await authService.getCurrentUser();
        if (active) setCurrentUser(user);
      } catch {
        authService.clearSession();
        if (active) setCurrentUser(null);
      } finally {
        if (active) setLoading(false);
      }
    }

    restoreSession();
    return () => {
      active = false;
    };
  }, []);

  const value = useMemo(
    () => ({
      currentUser,
      loading,
      async login(credentials) {
        const result = await authService.login(credentials);
        setCurrentUser(result.user);
        return result.user;
      },
      async register(credentials) {
        const result = await authService.register(credentials);
        setCurrentUser(result.user);
        return result.user;
      },
      async logout() {
        await authService.logout(navigate);
        setCurrentUser(null);
      }
    }),
    [currentUser, loading, navigate]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

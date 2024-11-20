import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  email: string;
  profilePicture?: string;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  authToken: string;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [authToken, setAuthToken] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    // Check for token and user info in localStorage
    const token = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setAuthToken(token);
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);

      // Redirect only if not already on the dashboard
      if (window.location.pathname === "/dashboard") {
        navigate("/dashboard");
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
      if (window.location.pathname !== "/login") {
        navigate("/");
      }
    }
  }, [navigate]);

  const login = (token: string, user: User) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    setIsAuthenticated(true);
    setAuthToken(token);
    navigate("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    setAuthToken("");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, authToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

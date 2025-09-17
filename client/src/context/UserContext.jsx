import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const navigate = useNavigate();

  const login = async (userData) => {
    // Handle standardized API response format
    if (userData.success && userData.data) {
      localStorage.setItem("user", JSON.stringify(userData.data.user));
      localStorage.setItem("token", userData.data.token);
      setUser(userData.data);
    } else if (userData.user && userData.token) {
      // Fallback for direct user and token values
      localStorage.setItem("user", JSON.stringify(userData.user));
      localStorage.setItem("token", userData.token);
      setUser(userData);
    } else {
      console.error("Invalid user data format received");
    }
  };

  const update = (userData) => {
    if (userData.success && userData.data) {
      localStorage.setItem("user", JSON.stringify(userData.data.user));
      setUser(userData.data);
    } else if (userData.user) {
      localStorage.setItem("user", JSON.stringify(userData.user));
      setUser(userData);
    } else {
      console.error("Invalid user data format received for update");
    }
  };

  const logout = () => {
    navigate("/");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, update }}>
      {children}
    </AuthContext.Provider>
  );
};

export default UserContext;

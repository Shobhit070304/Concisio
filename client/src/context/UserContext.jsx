import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const navigate = useNavigate();

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData.user));
    localStorage.setItem("token", userData.token);
    setUser(userData);
  };

  const update = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData.user));
    setUser(userData);
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

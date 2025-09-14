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
    if (userData.data) {
      // Handle response with data property (standard API response)
      localStorage.setItem("user", JSON.stringify(userData.data.user));
      localStorage.setItem("token", userData.data.token);
      setUser(userData.data);
    } else {
      // Handle direct user and token values
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", arguments[1]);
      setUser({ user: userData, token: arguments[1] });
    }
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

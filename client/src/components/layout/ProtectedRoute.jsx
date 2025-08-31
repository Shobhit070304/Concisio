import { useContext } from "react";
import { AuthContext } from "../../context/UserContext.jsx";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
}

// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children, role }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Navigate to="/" />;
  if (role && user.role !== role) return <Navigate to="/401" />;

  return children;
}

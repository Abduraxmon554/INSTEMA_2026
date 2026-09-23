import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AdminLogin from "../components/AdminLogin";
import AdminDashboard from "../components/AdminDashboard";

export default function Admin() {
  const { admin, ready } = useAuth();

  if (!ready) return null;
  if (!admin) return <AdminLogin />;
  if (admin.role !== "admin") return <Navigate to="/" replace />;

  return <AdminDashboard />;
}

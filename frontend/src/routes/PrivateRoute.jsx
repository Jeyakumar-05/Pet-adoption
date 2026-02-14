import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import RouteLoading from "./RouteLoading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <RouteLoading message="Verifying account access..." />;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};
export default PrivateRoute;

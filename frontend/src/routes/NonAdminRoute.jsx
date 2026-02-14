import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import RouteLoading from "./RouteLoading";

const NonAdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  
  if (loading) {
    return <RouteLoading message="Preparing page access..." />;
  }
  
  // If user is admin, redirect to home instead of showing contact page
  if (user && user.role === 'admin') {
    return <Navigate to="/" />;
  }
  
  return children;
};

export default NonAdminRoute;

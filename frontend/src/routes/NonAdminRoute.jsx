import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NonAdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  
  if (loading) {
    return (
      <div>
        <h1>Loading....</h1>
      </div>
    );
  }
  
  // If user is admin, redirect to home instead of showing contact page
  if (user && user.role === 'admin') {
    return <Navigate to="/" />;
  }
  
  return children;
};

export default NonAdminRoute;

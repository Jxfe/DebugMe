import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

/*****
 * Component used for non-role based authorization.
 */

// const RequireAuth = () => {
//   const { auth } = useAuth();
//   const location = useLocation();

//   return auth?.username ? (
//     <Outlet />
//   ) : (
//     <Navigate to="/signin" state={{ from: location }} replace />
//   );
// };

/*****
 * Component used for role-based authorization.
 */

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return allowedRoles.every((role) => auth?.roles?.includes(role)) ? (
    <Outlet />
  ) : auth?.username ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default RequireAuth;

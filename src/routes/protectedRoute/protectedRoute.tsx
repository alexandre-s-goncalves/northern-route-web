import { Navigate, Outlet } from 'react-router-dom';
import { RoutePaths } from 'resources/routePaths';

export const ProtectedRoute = () => {
  const token = localStorage.getItem('@NorthernRoute:token');

  if (!token) {
    return <Navigate to={RoutePaths.LOGIN} replace />;
  }

  return <Outlet />;
};

import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Home } from 'pages/Home/Home';
import { Login } from 'pages/Login/Login';
import { ProtectedRoute } from '../protectedRoute/protectedRoute';
import { RouteErrorBoundary } from 'components/routeErrorBoundary';
import { RoutePaths } from 'resources/routePaths';

export const webRoutes = createBrowserRouter([
  {
    element: <Login />,
    errorElement: <RouteErrorBoundary />,
    path: RoutePaths.LOGIN,
  },
  {
    element: <ProtectedRoute />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        element: <Home />,
        path: RoutePaths.HOME,
      },
    ],
  },
  {
    element: <Navigate to={RoutePaths.LOGIN} replace />,
    errorElement: <RouteErrorBoundary />,
    path: '*',
  },
]);

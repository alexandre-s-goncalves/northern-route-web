import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Home } from 'pages/Home/Home';
import { Login } from 'pages/Login/Login';
import { ProtectedRoute } from '../protectedRoute/protectedRoute';
import { RouteErrorBoundary } from 'components/routeErrorBoundary';
import { RoutePaths } from 'resources/routePaths';

export const webRoutes = createBrowserRouter(
  [
    {
      element: <Login />,
      errorElement: <RouteErrorBoundary />,
      path: RoutePaths.LOGIN,
    },
    {
      children: [
        {
          element: <Home />,
          path: RoutePaths.HOME,
        },
      ],
      element: <ProtectedRoute />,
      errorElement: <RouteErrorBoundary />,
    },
    {
      element: <Navigate to={RoutePaths.LOGIN} replace />,
      errorElement: <RouteErrorBoundary />,
      path: '*',
    },
  ],
  {
    basename: RoutePaths.HOME,
  },
);

import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Login } from 'pages/Login/Login';
import { Home } from 'pages/Home/Home';
import { ProtectedRoute } from 'routes/protectedRoute';
import { RoutePaths } from 'resources/routePaths';

export const webRoutes = createBrowserRouter([
  {
    path: RoutePaths.LOGIN,
    element: <Login />,
  },
  {
    path: RoutePaths.HOME,
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: RoutePaths.ANY,
    element: <Navigate to={RoutePaths.LOGIN} replace />,
  },
]);

import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import DashboardPage from '../pages/DashboardPage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ProtectedRoute from './ProtectedRoute';
import ErrorFallback from '../components/ErrorBoundary';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorFallback />,
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <ErrorFallback />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
    errorElement: <ErrorFallback />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
    errorElement: <ErrorFallback />,
  },
]); 
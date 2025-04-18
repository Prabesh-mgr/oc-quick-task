import React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { HomePage } from './pages/HomePage';
import { AuthLayout } from './components/Layout/MainLayout';
import { LandingPage } from './pages/LandingPage';
import { PublicRoutes } from './components/PublicRoutes';
import { ProtectedRoutes } from './components/ProtectedRoutes';

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoutes />,
    children: [
      {
        path: "/",
        element: <AuthLayout />,
        children: [
          { index: true, element: <LandingPage /> },
          { path: "login", element: <LoginPage /> },
          { path: "signup", element: <SignUpPage /> },
        ],
      },
    ]
  },

  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      {
        path: "",
        children: [
          { path: "home", element: <HomePage /> },
        ],
      },
    ],
  },
]);

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;

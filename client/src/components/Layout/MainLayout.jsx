
import React from 'react';
import { NavBar } from './NavBar';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';

export const AuthLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
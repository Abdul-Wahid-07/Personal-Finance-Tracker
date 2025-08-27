"use client"
import { useAuth } from '@/components/Auth/Auth';
import Dashboard from '@/components/Dashboard/Dashboard';
import Home from '@/components/Home/Home';
import React from 'react';

const page = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      {isLoggedIn ? (
        <Dashboard />
      ) : (
        <Home />
      )}
    </>
  )
}

export default page;
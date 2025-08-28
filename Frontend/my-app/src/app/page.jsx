"use client"
import { useAuth } from '@/components/Auth/Auth';
import Home from '@/components/Home/Home';
import { useRouter } from 'next/navigation';
import React from 'react';

const page = () => {
  const r = useRouter();
  const { isLoggedIn } = useAuth();
  return (
    <>
      {isLoggedIn ? (
        r.push("/dashboard")
      ) : (
        <Home />
      )}
    </>
  )
}

export default page;
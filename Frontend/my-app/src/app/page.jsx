"use client";
import { useAuth } from "@/components/Auth/Auth";
import Home from "@/components/Home/Home";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard");
    }
  }, [isLoggedIn, router]);

  if (isLoggedIn) {
    return null; 
  }

  return <Home />;
};

export default page;

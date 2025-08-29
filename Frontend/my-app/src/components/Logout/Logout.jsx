"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../Auth/Auth";

export default function Logout() {
  const router = useRouter();
  const { LogoutUser } = useAuth();

  useEffect(() => {
    LogoutUser();

    // redirect after short delay
    const timer = setTimeout(() => {
      router.push("/login");
    }, 4000);

    return () => clearTimeout(timer);
  }, [router, LogoutUser]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-sm w-full">
        {/* Spinner */}
        <div className="flex justify-center mb-4">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>

        {/* Text */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Logging you out...
        </h2>
        <p className="text-gray-500 text-sm">
          Please wait while we safely log you out.
        </p>
      </div>
    </div>
  );
}

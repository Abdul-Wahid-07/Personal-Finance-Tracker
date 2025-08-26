"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../Auth/Auth";

const Logout = () => {
    const router = useRouter();

    const { LogoutUser } = useAuth();

    useEffect(() => {
        LogoutUser();

        router.push("/login");
    }, [router]);

  return <p>Logging out...</p>;
    
}

export default Logout;

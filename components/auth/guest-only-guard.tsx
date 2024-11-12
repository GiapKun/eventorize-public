"use client";

import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "react-loading";
import LoadingPage from "../ui/loading";

const GuestOnlyGuard = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, isAdmin, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated && !isLoading) {
            if (isAdmin) {
                router.push("/admin");
            }
        }
    }, [isAuthenticated, isAdmin, router]);

    if (isLoading || isAdmin) {
        return (
            <LoadingPage />
        );
    }

    return <>{children}</>;
};

export default GuestOnlyGuard;

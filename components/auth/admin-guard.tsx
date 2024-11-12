"use client";

import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingPage from "../ui/loading";


type Props = {
    children: React.ReactNode;
};

const AdminGuard = ({ children }: Props) => {
    const { isAuthenticated, isAdmin, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated) {
                router.push("/login");
            } else if (!isAdmin) {
                router.push("/");
            }
        }
    }, [isLoading, isAuthenticated, isAdmin, router]);

    if (isLoading || !isAdmin) {
        return (
            <LoadingPage />
        );
    }

    return <>{children}</>;
};

export default AdminGuard;

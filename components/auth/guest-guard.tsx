"use client";

import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingPage from "../ui/loading";


type Props = {
    children: React.ReactNode;
};

const GuestGuard = ({ children }: Props) => {
    const { isAuthenticated, isLoading, isAdmin } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            if (isAdmin) {
                router.push("/admin");
            } else {
            router.push("/");
            }
        }
    }, [isLoading, isAuthenticated, router]);

    if (isLoading || isAuthenticated) {
        return (
            <LoadingPage />
        );
    }

    return <>{children}</>;
};

export default GuestGuard;

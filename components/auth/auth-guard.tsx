"use client";

import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import LoadingPage from "../ui/loading";


type Props = {
    children: React.ReactNode;
};

const AuthGuard = ({ children }: Props) => {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/login");
        }
    }, [isLoading, isAuthenticated, router]);

    if (isLoading || !isAuthenticated) {
        return (
            <LoadingPage />
        );
    }

    return <>{children}</>;
};

export default AuthGuard;

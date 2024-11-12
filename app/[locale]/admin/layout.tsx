"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/admin/layout/header";
import Sidebar from "@/components/admin/layout/sidebar";
import AdminGuard from "@/components/auth/admin-guard";
import AuthGuard from "@/components/auth/auth-guard";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(0);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setWindowWidth(width);

            if (width >= 1024) {
                setIsSidebarOpen(false);
            }
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <AuthGuard>
            <AdminGuard>
                 <div className="flex flex-col bg-background">
                    <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                    <div
                        className={`flex flex-1 flex-col bg-background dark:bg-medium min-h-screen transition-all duration-300 lg:ml-64 ${isSidebarOpen ? "lg:ml-64" : "ml-0"}`}
                    >
                        <div className="mb-5 sticky top-0 z-50 dark:text-white">
                            <Header toggleSidebar={toggleSidebar} />
                        </div>
                        <main className="flex-grow dark:bg-medium dark:text-white">
                            <div className=" mx-auto container max-w-screen-2xl p-4 ">{children}</div>
                        </main>
                    </div>
                </div>
            </AdminGuard>
        </AuthGuard>
    );
}

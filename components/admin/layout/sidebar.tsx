"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { FaUser, FaUsers, FaUserFriends } from "react-icons/fa";
import { IoHomeSharp, IoReceipt } from "react-icons/io5";
import { FaCalendarDays, FaUserShield, FaShield } from "react-icons/fa6";


type SidebarProps = {
    isOpen: boolean;
    toggleSidebar: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
    const pathname = usePathname();
    const router = useRouter();
    const [selectedPath, setSelectedPath] = useState(pathname);

    const hasLocale = /^\/[a-z]{2}\//.test(pathname);
    const slicePath = hasLocale ? pathname.slice(3) : pathname;

    useEffect(() => {
        setSelectedPath(slicePath);
    }, [slicePath]);

    const handleLinkClick = (href: string) => {
        router.push(href);
    };

    const menuItems = [
        { href: "/admin", label: "Dashboard", icon: IoHomeSharp },
        { href: "/admin/users", label: "Users", icon: FaUser },
        { href: "/admin/organizers", label: "Organizers", icon: FaUserFriends },
        { href: "/admin/colaborations", label: "Colaborations", icon: FaUsers },
        { href: "/admin/events", label: "Events", icon: FaCalendarDays },
        { href: "/admin/orders", label: "Order", icon: IoReceipt },
        { href: "/admin/permissions", label: "Permissions", icon: FaUserShield },
        { href: "/admin/roles", label: "Roles", icon: FaShield }
    ];

    return (
        <>
            <div
                className={`fixed z-50 w-64 bg-background dark:bg-dark-950 dark:border-darker-950 border-r-2 h-screen flex-shrink-0 transform transition-transform duration-300 ease-in-out
                             ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} overflow-y-auto`}
            >
                <div className="h-full flex flex-col">
                    <div className="flex items-center justify-center h-20 min-h-20 ">
                        <h1 className="text-2xl font-bold text-primary dark:text-primary-500">
                            <Link href="/admin">eventorize</Link>
                        </h1>
                    </div>
                    <nav className="flex-1 py-8">
                        <ul className="space-y-6">
                            {menuItems.map(({ href, label, icon: Icon }) => (
                                <li key={label} className="py-2 rounded-xl hover:font-bold">
                                    <div className="flex cursor-pointer" onClick={() => handleLinkClick(href)}>
                                        <div className="flex items-center relative pl-6">
                                            {selectedPath === href && (
                                                <div className="absolute left-0 w-1 bg-primary h-10 rounded-r-full"></div>
                                            )}
                                            <Icon color={selectedPath === href ? "#2176AE" : "#C5C5CF"} size={25} />
                                            <p
                                                className={`ml-6 ${
                                                    selectedPath === href ? "text-primary" : "text-gray-400"
                                                }`}
                                            >
                                                {label}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={toggleSidebar}></div>
            )}
        </>
    );
};

export default Sidebar;

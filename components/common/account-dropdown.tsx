"use client";

import { FaAngleDown } from "react-icons/fa";
import useDropdown from "../../hooks/use-toggle-dropdown";
import { RiAccountCircleLine } from "react-icons/ri";
import { useAuth } from "../../context/auth-context";
import { t } from "i18next";

const AccountDropdown: React.FC = () => {
    const { isOpen, toggle, ref } = useDropdown();
    const { email, logout } = useAuth();

    const handleToggleClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        toggle();
        console.log("Account dropdown clicked");
    };

    return (
        <div ref={ref} className="relative">
            <div className="h-full rounded-full cursor-pointer hover:bg-gray-50 dark:hover:bg-medium">
                <div
                    onClick={handleToggleClick}
                    className="max-w-18 lg:max-w-56 h-11 sm:ml-3 ml-auto rounded-full flex items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-medium"
                >
                    <RiAccountCircleLine size={34} />
                    <p className="text-xs ml-1 hidden lg:block text-gray-600 dark:text-white select-none"> {email} </p>
                    <span className="mx-1">
                        <FaAngleDown color="#545454" />
                    </span>
                </div>
                <div
                    className={`absolute select-none z-50 w-60 right-0 px-5 py-3 bg-white dark:bg-dark dark:border-gray-700 rounded-lg shadow border  transition-all duration-100 ease-in-out transform ${
                        isOpen ? "max-h-60 opacity-100 scale-y-100" : "max-h-0 opacity-0 scale-y-0"
                    } origin-top`}
                >
                    <ul className="space-y-3">
                        <li className="font-medium">
                            <button
                                onClick={(e) => {
                                    console.log("Account clicked");
                                }}
                                className="w-full text-left flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700"
                            >
                                <div className="mr-3">
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        ></path>
                                    </svg>
                                </div>
                                Account
                            </button>
                        </li>
                        <li className="font-medium">
                            <button
                                onClick={(e) => {
                                    console.log("Settings clicked");
                                }}
                                className="w-full text-left flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700"
                            >
                                <div className="mr-3">
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 
                                                        3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 
                                                        0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                        ></path>
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        ></path>
                                    </svg>
                                </div>
                                Settings
                            </button>
                        </li>
                        <hr />
                        <li className="font-medium flex">
                            <button
                                onClick={(e) => {
                                    logout();
                                }}
                                className="w-full text-left flex justify-between pr-1 items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-red-600"
                            >
                                <div className="flex items-center">
                                    <div className="mr-3 text-red-600">
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                            ></path>
                                        </svg>
                                    </div>
                                    Logout
                                </div>
                            </button>
                        </li>
                    </ul>
                </div>
                {/* )} */}
            </div>
        </div>
    );
};

export default AccountDropdown;

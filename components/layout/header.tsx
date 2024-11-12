"use client";

import Link from "next/link";
import { useAuth } from "../../context/auth-context";
import { FaSearch, FaHeart } from "react-icons/fa";
import { IoAdd, IoTicketSharp } from "react-icons/io5";
import AccountDropdown from "../common/account-dropdown";
// import LanguageDropdown from "../common/language-dropdown";
import { ModeToggle } from "../common/mode-toggle";
const Header = () => {
    const { isAuthenticated } = useAuth();

    return (
        <nav className="bg-white dark:bg-dark shadow-md top-0 z-50 w-full sticky">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4">
                <div className="flex items-center h-[80px]">
                    <div className="flex-shrink-0 mr-8">
                        <Link href="/">
                            <p className="text-sm sm:text-2xl font-bold text-primary font-jua">eventorize</p>
                        </Link>
                    </div>

                    <div className="w-full h-11 relative mr-3 dark:border-darker-950">
                        <span className="absolute h-full flex items-center left-3 cursor-pointer">
                            <FaSearch size={15} />
                        </span>
                        <input
                            className="pl-9 text-text_secondary border dark:border-darker-950 w-full h-full rounded-3xl outline-primary"
                            type="text"
                            placeholder="Search events"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        {isAuthenticated && (
                            <div className="w-32 h-12 mx-5 hidden sm:flex flex-col justify-center cursor-pointer text-xs text-center text-secondary border-none">
                                <div className="flex flex-col items-center justify-center">
                                    <Link href="/event/create-event">
                                        <p className="flex justify-center text-text_secondary">
                                            <IoAdd size={24} />
                                        </p>
                                        Create an event
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* <div className="w-9 h-12 mx-5 hidden sm:flex flex-col justify-center cursor-pointer">
                            <p className="flex justify-center text-text_secondary">
                                <FaHeart size={20} />
                            </p>
                            <p className="text-xs text-center">Love</p>
                        </div>

                        <div className="w-9 h-12 mx-5 hidden sm:flex flex-col justify-center cursor-pointer">
                            <p className="flex justify-center text-text_secondary">
                                <IoTicketSharp size={20} />
                            </p>
                            <p className="text-xs text-center">Tickets</p>
                        </div> */}

                        <ModeToggle />
                    </div>

                    {/* <LanguageDropdown /> */}

                    {isAuthenticated ? (
                        <AccountDropdown />
                    ) : (
                        <div className="max-w-56 sm:max-w-56 h-11 sm:ml-3 flex items-center justify-end">
                            <Link
                                href="/login/signup"
                                className="hidden md:block border py-2 px-3 rounded-full text-sm text-text_secondary hover:bg-primary hover:text-white mr-4 whitespace-nowrap"
                            >
                                Sign Up
                            </Link>
                            <Link
                                href="/login"
                                className="border py-2 px-3 rounded-full text-sm text-text_secondary hover:bg-primary hover:text-white whitespace-nowrap"
                            >
                                Sign In
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;

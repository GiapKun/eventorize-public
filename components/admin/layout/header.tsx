"use client";
import { IoMenu } from "react-icons/io5";
import AccountDropdown from "@/components/common/account-dropdown";
import { ModeToggle } from "@/components/common/mode-toggle";


type HeaderProps = {
    toggleSidebar: () => void;
};

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    return (
        <nav className="bg-background dark:bg-dark shadow-sm w-full">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex lg:justify-end justify-between items-center h-[80px]">
                    <div className="lg:hidden">
                        <button onClick={toggleSidebar}>
                            <IoMenu size={24} />
                        </button>
                    </div>

                    <div className="relative flex items-center ">        
                        <ModeToggle />    
                        <AccountDropdown />
                    </div>
                </div>
            </div>
        </nav>
    );
};


export default Header;

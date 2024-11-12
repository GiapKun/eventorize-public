"use client";

import { useState } from "react";
import { CiSearch } from "react-icons/ci";

interface SearchBarProps {
    onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch(searchValue);
    };

    return (
        <form onSubmit={handleSearch} className="w-full flex justify-center items-center">
            <div className="w-full relative">
                <span className="absolute h-full flex items-center right-2 cursor-pointer">
                    <button
                        type="submit"
                        className="p-2  text-gray-800 rounded-lg transition-colors hover:opacity-80"
                    >
                        <CiSearch size={20} />
                    </button>
                </span>
                <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search"
                    className="w-full p-2 border  rounded-lg outline-none focus:ring-2 focus:ring-primary dark:bg-dark dark:border-gray-700"
                />
            </div>
        </form>
    );
};

export default SearchBar;

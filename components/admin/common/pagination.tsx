import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="flex items-center space-x-2">
            <button
                className={`px-3 py-1 rounded-md ${
                    currentPage === 1 ? "cursor-not-allowed" : " text-primary"
                }`}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                    <IoIosArrowBack color="#2176ae" size={18}/>
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    className={`px-3 py-1 rounded-md ${currentPage === page ? "bg-primary text-white" : ""}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}

            <button
                className={`px-3 py-1 rounded-md ${
                    currentPage === totalPages ? "cursor-not-allowed" : " text-primary"
                }`}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                    <IoIosArrowForward  color="#2176ae" size={18}/>
            </button>
        </div>
    );
};

export default Pagination;

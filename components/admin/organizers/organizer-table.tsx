import React, { useState, useEffect } from "react";
import Pagination from "../common/pagination";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { FaRegTrashAlt, FaArrowDown } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

interface TableColumn {
    header: string;
    accessor: string;
}

interface TableRow {
    [key: string]: any;
}

interface TableProps {
    columns: TableColumn[];
    data: TableRow[];
    totalPages: number;
    rowsPerPage: number;
    currentPage: number;
    onSortOrder: (column: string, order: string) => void;
    onRowClick: (row: TableRow) => void;
    onRowDelete: (id: string) => void;
    onPageChange: (page: number) => void;
    onRowsPerPageChange: (rowsPerPage: number) => void;
}

const Table: React.FC<TableProps> = ({
    columns,
    data,
    totalPages,
    rowsPerPage,
    currentPage,
    onSortOrder,
    onRowClick,
    onRowDelete,
    onPageChange,
    onRowsPerPageChange
}) => {
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc" | undefined>(undefined);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState<string[]>([]);

    useEffect(() => {
        const savedSortColumn = localStorage.getItem("sortColumn");
        const savedSortDirection = localStorage.getItem("sortDirection");

        if (savedSortColumn) {
            setSortColumn(savedSortColumn);
        }
        if (savedSortDirection) {
            setSortDirection(savedSortDirection as "asc" | "desc");
        }
    }, []);

    const handleSort = (accessor: string) => {
        const nextDirection = sortColumn === accessor ? (sortDirection === "asc" ? "desc" : "asc") : "asc";

        setSortColumn(accessor);
        setSortDirection(nextDirection);
        onSortOrder(accessor, nextDirection);

        localStorage.setItem("sortColumn", accessor);
        localStorage.setItem("sortDirection", nextDirection);
    };

    const sortedData = [...data].sort((a, b) => {
        if (!sortColumn || !sortDirection) return 0;

        const aValue = a[sortColumn];
        const bValue = b[sortColumn];

        if (aValue < bValue) {
            return sortDirection === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
            return sortDirection === "asc" ? 1 : -1;
        }
        return 0;
    });
    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(event.target.value, 10);
        onRowsPerPageChange(value);
    };

    const handlePageChange = (page: number) => {
        onPageChange(page);
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedRows([]);
        } else {
            setSelectedRows(data.map((row) => row.id));
        }
        setSelectAll(!selectAll);
    };

    const handleRowSelect = (id: string) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };

    return (
        <>
            <div className="w-full overflow-x-auto bg-white dark:bg-dark border-y dark:border-gray-800 rounded-xl shadow-2xl">
                <table className="min-w-[300px] w-full table-auto border-collapse">
                    <thead className="relative">
                        {selectAll && (
                            <div className="absolute top-0 left-0 w-full h-full bg-gray-50 dark:bg-medium opacity-90"></div>
                        )}
                        <tr className="text-left select-none bg-gray-50 dark:bg-dark opacity-90">
                            <th className="p-4">
                                <div className="inline-flex items-center">
                                    <label className="flex items-center cursor-pointer relative">
                                        <input
                                            type="checkbox"
                                            checked={selectAll}
                                            onChange={handleSelectAll}
                                            className=" peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-600 checked:bg-slate-800 checked:border-slate-800"
                                        />
                                        <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-3.5 w-3.5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                stroke="currentColor"
                                                stroke-width="1"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clip-rule="evenodd"
                                                ></path>
                                            </svg>
                                        </span>
                                    </label>
                                </div>
                            </th>
                            <th
                                className="p-4 text-sm font-bold text-primary cursor-pointer"
                                onClick={() => handleSort("name")}
                            >
                                <div className="flex items-center hover:font-extrabold">
                                    Name
                                    {sortColumn === "name" && (
                                        <span className="ml-2">
                                            <FaArrowDown
                                                className={`duration-100 ${sortDirection === "asc" ? "block rotate-180" : "block"}`}
                                            />
                                        </span>
                                    )}
                                </div>
                            </th>

                            {columns.map((column, index) => (
                                <th
                                    key={index}
                                    className="p-4 text-sm font-bold text-primary cursor-pointer"
                                    onClick={() => handleSort(column.accessor)}
                                >
                                    <div className="flex items-center hover:font-extrabold">
                                        {column.header}
                                        {sortColumn === column.accessor && (
                                            <span className="ml-2">
                                                <FaArrowDown
                                                    className={`duration-100 ${sortDirection === "asc" ? "block rotate-180" : "block"}`}
                                                />
                                            </span>
                                        )}
                                    </div>
                                </th>
                            ))}

                            <th className="p-4 text-sm font-bold text-primary"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className="border-y dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                            >
                                <td className="p-4">
                                    <div className="inline-flex items-center">
                                        <label className="flex items-center cursor-pointer relative">
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.includes(row.id)}
                                                onChange={() => handleRowSelect(row.id)}
                                                className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-600 checked:bg-slate-800 checked:border-slate-800"
                                            />
                                            <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-3.5 w-3.5"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    stroke="currentColor"
                                                    stroke-width="1"
                                                >
                                                    <path
                                                        fill-rule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clip-rule="evenodd"
                                                    ></path>
                                                </svg>
                                            </span>
                                        </label>
                                    </div>
                                </td>
                                <td className="text-start p-4 text-sm text-gray-700 dark:text-white whitespace-nowrap">
                                    <div className="flex items-center">
                                        <Avatar>
                                            <AvatarImage src={row.logo} />
                                            <AvatarFallback>LOGO</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="ml-2">{row.name}</p>
                                            <p className="ml-2 text-slate-500">{row.email}</p>
                                        </div>
                                    </div>
                                </td>
                                {columns.map((column, colIndex) => (
                                    <td
                                        key={colIndex}
                                        className="text-start p-4 text-sm text-gray-700 dark:text-white whitespace-nowrap"
                                    >
                                        {row[column.accessor]}
                                    </td>
                                ))}
                                <td className="p-4 flex space-x-2">
                                    <div className="flex ">
                                        <button
                                            className="flex items-center justify-center text-gray-600 dark:text-white hover:text-gray-900 w-8 h-8 bg-gray-50 rounded-full bg-opacity-0 hover:bg-opacity-20 "
                                            onClick={() => onRowClick(row)}
                                        >
                                            <MdEdit />
                                        </button>
                                        <button
                                            className="flex items-center justify-center text-gray-600 dark:text-white hover:text-gray-900 w-8 h-8 bg-gray-50 rounded-full bg-opacity-0 hover:bg-opacity-20 "
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onRowDelete(row.id);
                                            }}
                                        >
                                            <FaRegTrashAlt />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex flex-col md:flex-row items-center justify-between w-full sticky left-0 px-4 my-4 ">
                    <div className="flex items-center">
                        <p className="text-sm">Rows per page:</p>
                        <select
                            value={rowsPerPage}
                            className="p-1 md:p-2 border border-gray-600 rounded-lg ml-2 dark:bg-medium"
                            onChange={handleRowsPerPageChange}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Table;

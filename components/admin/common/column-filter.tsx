import React from "react";
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
import useDropdown from "@/hooks/use-toggle-dropdown";
import { Button } from "@/components/ui/button-comp";

interface Column {
    header: string;
    accessor: string;
}

interface ColumnFilterProps {
    availableColumns: Column[];
    selectedColumns: string[];
    onColumnSelect: (accessor: string) => void;
}

const ColumnFilter: React.FC<ColumnFilterProps> = ({ availableColumns, selectedColumns, onColumnSelect }) => {
    const { isOpen, toggle, ref } = useDropdown();

    return (
        <div className="relative" ref={ref}>
            <Button type="button" onClick={toggle} className="px-4 py-2">
                <HiMiniAdjustmentsHorizontal className="mr-2" /> Columns
            </Button>
            <div
                className={`absolute z-50 left-0 mt-2 w-48 bg-white dark:bg-gray-700 dark:border-gray-600 shadow-md rounded-md transition-all duration-100 ease-in-out transform ${
                    isOpen ? "max-h-48 opacity-100 scale-y-100" : "max-h-0 opacity-0 scale-y-0"
                } origin-top`}
            >
                <div className="max-h-48 overflow-auto">
                    {availableColumns.map((col) => (
                        <div
                            key={col.accessor}
                            className="flex items-center px-2 py-2 m-2 hover:bg-gray-100 dark:hover:bg-darker rounded-xl"
                        >
                            <div className="inline-flex items-center pr-2">
                                <label className="flex items-center cursor-pointer relative">
                                    <input
                                        type="checkbox"
                                        checked={selectedColumns.includes(col.accessor)}
                                        onChange={() => onColumnSelect(col.accessor)}
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
                            <label>{col.header}</label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ColumnFilter;

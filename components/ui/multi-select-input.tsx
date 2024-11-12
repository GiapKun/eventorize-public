import React, { useState } from "react";
import useDropdown from "@/hooks/use-toggle-dropdown";

interface Item {
    id: string;
    label: string;
}

interface MultiSelectInputProps {
    items: Item[];
    placeholder?: string;
}

const MultiSelectInput: React.FC<MultiSelectInputProps> = ({ items, placeholder }) => {
    const [selectedItems, setSelectedItems] = useState<Item[]>([]);
    const { isOpen, toggle, ref } = useDropdown();

    const handleCheckboxChange = (item: Item) => {
        setSelectedItems((prev) => {
            if (prev.find((i) => i.id === item.id)) {
                return prev.filter((i) => i.id !== item.id);
            } else {
                return [...prev, item];
            }
        });
    };

    const handleInputClick = () => {
        toggle();
    };

    const selectedLabels = selectedItems.map((item) => item.label).join(", ");

    return (
        <div className="relative" ref={ref}>
            <input
                type="text"
                value={selectedLabels}
                onClick={handleInputClick}
                placeholder={placeholder}
                readOnly
                className="border border-gray-300 dark:bg-dark dark:border-slate-800 p-2 rounded-lg w-full cursor-pointer"
            />

            <div
                className={`absolute z-50 left-0 mt-2 w-48 bg-white dark:bg-gray-700 dark:border-gray-600 shadow-md rounded-md transition-all duration-100 ease-in-out transform ${
                    isOpen ? "max-h-48 opacity-100 scale-y-100" : "max-h-0 opacity-0 scale-y-0"
                } origin-top`}
            >
                <div className="max-h-48 overflow-auto">
                    {items.map((item) => (
                        <label key={item.id} className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-dark">
                            <div className="inline-flex items-center p-2">
                                <label className="flex items-center cursor-pointer relative">
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.some((selected) => selected.id === item.id)}
                                        onChange={() => handleCheckboxChange(item)}
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
                            {item.label}
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MultiSelectInput;

import { useState, useRef, useEffect } from "react";

type UseDropdownReturnType = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    toggleDropdown: () => void;
    dropdownRef: React.RefObject<HTMLDivElement>;
};

export default function useDropdown(): UseDropdownReturnType {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);
    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            onClose();
        }
    };
    

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return {
        isOpen,
        onOpen,
        onClose,
        toggleDropdown,
        dropdownRef
    };
}

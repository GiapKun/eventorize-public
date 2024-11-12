import React from "react";

interface DialogProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const Dialog: React.FC<DialogProps> = ({ isOpen, title, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50"></div>

            <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 z-10">
                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                <p className="mt-4 text-gray-600">{message}</p>

                <div className="mt-6 flex justify-end space-x-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dialog;

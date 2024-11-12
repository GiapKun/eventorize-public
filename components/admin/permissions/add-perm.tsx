"use client";

import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { toastError, toastSuccess } from "@/components/common/toast";
import { createPermission } from "@/app/api/permissions";
import ReactLoading from "react-loading";
import { useCloseOnEsc } from "@/hooks/use-close-on-esc";
import {useForm, SubmitHandler} from "react-hook-form";

interface Permission {
    id: string;
    name: string;
    scope: string;
    group: string;
    api_path: string;
    method: string;
    status: string;
    description: string;
}

interface PermProps {
    onClose: () => void;
    onUpdate: () => void;
}

const AddPerm: React.FC<PermProps> = ({ onClose, onUpdate }) => {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { isSubmitting, errors }
    } = useForm<Permission>();

    const onSubmit: SubmitHandler<Permission> = async (data) => {
        setLoading(true);
        try {
            await createPermission(data);
            toastSuccess("Permission created successfully");
            onUpdate();
            onClose();
        } catch (error) {
            console.error("Failed to create permission:", error);
            toastError("Failed to create permission");
        } finally {
            setLoading(false);
        }
    };

    useCloseOnEsc(onClose);

    return (
        <div className="flex justify-center h-screen rounded-2xl overflow-y-scroll scrollbar-hide">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-6xl m-auto shadow-xl">
                <div className="sticky top-0 w-full h-12 bg-[#3F97DE] dark:bg-primary rounded-t-2xl flex justify-between items-center px-6 shadow-xl">
                    <p className="text-white font-medium">ADD NEW PERMISSION</p>
                    <IoClose className="hover:rotate-90 duration-300" size={26} color="white" onClick={onClose} />
                </div>
                {loading && (
                    <div className="flex justify-center">
                        <ReactLoading type="cubes" color="#2176ae" />
                    </div>
                )}
                <div className="px-6 py-12 bg-white dark:bg-medium">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 col-span-3">
                        <div>
                            <label htmlFor="name" className="flex text-sm font-medium text-gray-700 dark:text-white">
                                Name
                                <p className="text-red-600 ml-1">*</p>
                            </label>
                            <input
                                type="text"
                                id="name"
                                {...register("name", { required: "Name is required" })}
                                className="mt-1 p-2 w-full bg-[#EBF5FF] dark:bg-medium dark:border dark:border-gray-600 rounded-lg focus:outline-none"
                            />
                        </div>

                        <div>
                            <label htmlFor="scope" className="flex text-sm font-medium text-gray-700 dark:text-white">
                                Scope
                                <p className="text-red-600 ml-1">*</p>
                            </label>
                            <input
                                type="text"
                                id="scope"
                                {...register("scope", { required: "Scope is required" })}
                                className="mt-1 p-2 w-full bg-[#EBF5FF] dark:bg-medium dark:border dark:border-gray-600 rounded-lg focus:outline-none"
                            />
                        </div>
                        <div>
                            <label htmlFor="group" className="flex text-sm font-medium text-gray-700 dark:text-white">
                                Group
                                <p className="text-red-600 ml-1">*</p>
                            </label>
                            <input
                                type="text"
                                id="group"
                                {...register("group", { required: "Group is required" })}
                                className="mt-1 p-2 w-full bg-[#EBF5FF] dark:bg-medium dark:border dark:border-gray-600 rounded-lg focus:outline-none"
                            />
                        </div>

                        <div>
                            <label htmlFor="api_path" className="flex text-sm font-medium text-gray-700 dark:text-white">
                                URL
                                <p className="text-red-600 ml-1">*</p>
                            </label>
                            <input
                                type="text"
                                id="api_path"
                                {...register("api_path", { required: "URL is required" })}
                                className="mt-1 p-2 w-full bg-[#EBF5FF] dark:bg-medium dark:border dark:border-gray-600 rounded-lg focus:outline-none"
                            />
                        </div>

                        <div>
                            <label htmlFor="method" className="flex text-sm font-medium text-gray-700 dark:text-white">
                                Method
                                <p className="text-red-600 ml-1">*</p>
                            </label>
                            <select
                                id="method"
                                {...register("method", { required: "Method is required" })}
                                className="mt-1 p-3 w-full bg-[#EBF5FF] dark:bg-medium dark:border dark:border-gray-600 rounded-lg focus:outline-none"
                            >
                                <option value="" disabled>
                                    Select a method
                                </option>
                                <option value="GET">GET</option>
                                <option value="POST">POST</option>
                                <option value="PUT">PUT</option>
                                <option value="DELETE">DELETE</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="status" className="flex text-sm font-medium text-gray-700 dark:text-white">
                                Status
                                <p className="text-red-600 ml-1">*</p>
                            </label>
                            <select
                                id="status"
                                {...register("status", { required: "Status is required" })}
                                className="mt-1 p-3 w-full bg-[#EBF5FF] dark:bg-medium dark:border dark:border-gray-600 rounded-lg focus:outline-none"
                            >
                                <option value="" disabled>
                                    Select a status
                                </option>
                                <option value="active">active</option>
                                <option value="inactive">inactive</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="description" className="flex text-sm font-medium text-gray-700 dark:text-white">
                                Description
                                <p className="text-red-600 ml-1">*</p>
                            </label>
                            <input
                                type="text"
                                id="description"
                                {...register("description", { required: "Description is required" })}
                                className="mt-1 p-2 w-full bg-[#EBF5FF] dark:bg-medium dark:border dark:border-gray-600 rounded-lg focus:outline-none"
                            />
                        </div>
                    </div>
                </div>
                <div className="sticky bottom-0 w-full h-12 bg-gray-50 dark:bg-medium rounded-b-2xl flex justify-end items-center pr-6 shadow-xl">
                    <button type="submit" className="px-2 py-1 bg-[#3F97DE] text-white rounded-lg hover:bg-primary">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddPerm;

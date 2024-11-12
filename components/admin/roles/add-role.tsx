"use client";

import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { toastError, toastSuccess } from "@/components/common/toast";
import { createRole } from "@/app/api/roles";
import ReactLoading from "react-loading";
import { useCloseOnEsc } from "@/hooks/use-close-on-esc";
import { useForm, SubmitHandler } from "react-hook-form";

interface Permission {
    _id: string;
    status: string;
    is_denied: boolean;
}

interface Role {
    id: string;
    name: string;
    description: string;
    parent_role_id: string;
    parent_role_name: string;
    user_type: string;
    is_hidden: boolean;
    status: string;
    permissions: Permission[];
    created_at: string;
    created_by: string;
    updated_at: string;
    updated_by: string;
}

interface RoleProps {
    onClose: () => void;
    onUpdate: () => void;
}

const AddRole: React.FC<RoleProps> = ({ onClose, onUpdate }) => {
    const [loading, setLoading] = useState(false);
    const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>([]);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { isSubmitting, errors }
    } = useForm<Role>();

    const onSubmit: SubmitHandler<Role> = async (data) => {
        setLoading(true);
        try {
            data.permissions = selectedPermissions;
            await createRole(data);
            toastSuccess("Role created successfully");
            onUpdate();
            onClose();
        } catch (error) {
            console.error("Failed to create role:", error);
            toastError("Failed to create role");
        } finally {
            setLoading(false);
        }
    };

    useCloseOnEsc(onClose);

    const permissionOptions = [
        { _id: "perm1", name: "Permission 1" },
        { _id: "perm2", name: "Permission 2" },
        { _id: "perm3", name: "Permission 3" },
    ];

    const handlePermissionChange = (permissionId: string, isChecked: boolean) => {
        const updatedPermissions = isChecked
            ? [
                  ...selectedPermissions,
                  { _id: permissionId, status: "active", is_denied: false },
              ]
            : selectedPermissions.filter((p) => p._id !== permissionId);

        setSelectedPermissions(updatedPermissions);
    };

    return (
        <div className="flex justify-center h-screen rounded-2xl overflow-y-scroll scrollbar-hide">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-6xl m-auto shadow-xl">
                <div className="sticky top-0 w-full h-12 bg-[#3F97DE] dark:bg-primary rounded-t-2xl flex justify-between items-center px-6 shadow-xl">
                    <p className="text-white font-medium">ADD NEW ROLE</p>
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
                            <label
                                htmlFor="description"
                                className="flex text-sm font-medium text-gray-700 dark:text-white"
                            >
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

                        <div>
                            <label
                                htmlFor="permissions"
                                className="flex text-sm font-medium text-gray-700 dark:text-white"
                            >
                                Permissions
                                <p className="text-red-600 ml-1">*</p>
                            </label>
                            <div className="mt-2">
                                {permissionOptions.map((permission) => (
                                    <div key={permission._id} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={permission._id}
                                            onChange={(e) => handlePermissionChange(permission._id, e.target.checked)}
                                            className="mr-2"
                                        />
                                        <label htmlFor={permission._id} className="text-gray-700 dark:text-white">
                                            {permission.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
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

export default AddRole;

"use client";

import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { toastPromise } from "@/components/common/toast";
import { updateUser } from "@/app/api/users";
import { useCloseOnEsc } from "@/hooks/use-close-on-esc";
import { useTranslation } from "react-i18next";
import { RHFInput } from "@/components/ui/rhf-input";
import FormProvider from "@/components/ui/form-provider";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "@/app/models/user/schema";
import { Button } from "@/components/ui/button-comp";

interface User {
    id: string;
    fullname: string;
    email: string;
    phone?: string | null;
    position?: string | null;
    company?: string | null;
    district?: string | null;
    ward?: string | null;
    city?: string | null;
    country?: string | null;
    facebook?: string | null;
    twitter?: string | null;
    linkedin?: string | null;
    instagram?: string | null;
    avatar?: string | null;
}

interface UserProps {
    user: User;
    onClose: () => void;
    onUserUpdate: () => void;
}

const EditUser: React.FC<UserProps> = ({ user, onClose, onUserUpdate }) => {
    const { t } = useTranslation();

    const methods = useForm<User>({
        defaultValues: user,
        resolver: yupResolver(userSchema)
    });

    const { handleSubmit, reset } = methods;

    useEffect(() => {
        reset(user);
    }, [user, reset]);

    const onSubmit: SubmitHandler<User> = async (data) => {
        try {
            onClose();
            await toastPromise(updateUser(user.id, data), {
                pending: "Updating user data...",
                success: "User data updated successfully",
                error: "Error updating user data"
            });
            onUserUpdate();
        } catch (error: any) {
            console.log("Error updating user data:", error);
        }
    };

    useCloseOnEsc(onClose);

    return (
        <div className="flex justify-center h-screen overflow-y-scroll scrollbar-hide rounded-2xl ">
            <FormProvider
                className="w-full max-w-6xl m-auto shadow-b-xl"
                methods={methods}
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="w-full sticky top-0 h-12 bg-primary rounded-t-2xl flex justify-between items-center px-6 shadow-xl">
                    <p className="text-white font-medium">EDIT USER</p>
                    <IoClose className="hover:rotate-90 duration-300" size={26} color="white" onClick={onClose} />
                </div>
                <div className="px-6 py-6 bg-white dark:bg-medium">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-white">Avatar</label>
                            <div className="w-full h-44 bg-[#EBF5FF] dark:bg-medium rounded-2xl border border-gray-300"></div>
                        </div>
                        <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <RHFInput label="Full name" name="fullname" placeholder="Enter fullname" />
                            <RHFInput label="Phone" name="phone" placeholder="Enter phone" />
                            <RHFInput label="Position" name="position" placeholder="Enter position" />
                            <RHFInput label="Company" name="company" placeholder="Enter company" />
                            <RHFInput label="District" name="district" placeholder="Enter district" />
                            <RHFInput label="Ward" name="ward" placeholder="Enter ward" />
                            <RHFInput label="City" name="city" placeholder="Enter city" />
                            <RHFInput label="Country" name="country" placeholder="Enter country" />
                            <RHFInput label="Facebook" name="facebook" placeholder="Enter Facebook" />
                            <RHFInput label="Twitter" name="twitter" placeholder="Enter Twitter" />
                            <RHFInput label="LinkedIn" name="linkedin" placeholder="Enter LinkedIn" />
                            <RHFInput label="Instagram" name="instagram" placeholder="Enter Instagram" />
                        </div>
                    </div>
                </div>
                <div className="sticky bottom-0 w-full h-12 bg-gray-50 dark:bg-medium dark:border-t-2 dark:border-gray-700 rounded-b-2xl flex justify-end items-center pr-6 shadow-xl">
                    <Button type="submit" className="px-2">
                        Save
                    </Button>
                </div>
            </FormProvider>
        </div>
    );
};

export default EditUser;

"use client";

import { useState } from "react";
import { toastPromise } from "@/components/common/toast";
import { registerUser } from "@/app/api/users";
import ReactLoading from "react-loading";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useCloseOnEsc } from "@/hooks/use-close-on-esc";
import { RHFInput } from "@/components/ui/rhf-input";
import FormProvider from "@/components/ui/form-provider";
import { yupResolver } from "@hookform/resolvers/yup";
import { resgistationSchema } from "@/app/models/user/schema";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

interface User {
    fullname: string;
    email: string;
    phone?: string | null;
    password: string;
}

interface UserProps {
    onClose: () => void;
    onUserCreate: () => void;
}

const AddUser: React.FC<UserProps> = ({ onClose, onUserCreate }) => {
    const { t } = useTranslation();

    const methods = useForm<User>({
        resolver: yupResolver(resgistationSchema)
    });

    const {
        handleSubmit,
        setValue,
    } = methods;

    const onSubmit: SubmitHandler<User> = async (data) => {
        try {
            onClose();
            await toastPromise(registerUser(data), {
                pending: "Creating user...",
                success: "User created successfully",
                error: "Error creating user data"
            });
            onUserCreate();
        } catch (error: any) {
            console.log("Error creating user:", error);
        }
    };

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useCloseOnEsc(onClose);

    const generatePassword = (length: number): string => {
        const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
        const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numberChars = "0123456789";
        const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";

        const allChars = lowercaseChars + uppercaseChars + numberChars + specialChars;

        let password = "";
        password += lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
        password += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
        password += numberChars[Math.floor(Math.random() * numberChars.length)];
        password += specialChars[Math.floor(Math.random() * specialChars.length)];

        for (let i = 4; i < length; i++) {
            password += allChars[Math.floor(Math.random() * allChars.length)];
        }

        password = password
            .split("")
            .sort(() => 0.5 - Math.random())
            .join("");

        return password;
    };

    const handleGeneratePassword = () => {
        const newPassword = generatePassword(12);
        setValue("password", newPassword);
    };

    return (
        <div className="flex justify-center h-screen overflow-y-scroll scrollbar-hide rounded-2xl">
            <FormProvider
                className="w-full max-w-6xl m-auto shadow-b-xl"
                methods={methods}
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="w-full sticky top-0 h-12 bg-[#3F97DE] dark:bg-primary rounded-t-2xl flex justify-between items-center px-6 shadow-xl">
                    <p className="text-white font-medium">ADD NEW USER</p>
                    <IoClose className="hover:rotate-90 duration-300" size={26} color="white" onClick={onClose} />
                </div>
                <div className="px-6 py-6 bg-white dark:bg-medium">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 col-span-3">
                        <RHFInput required={true} name="fullname" label="Full Name" />
                        <RHFInput required={true} name="email" label="Email" />
                        <RHFInput name="phone" label="Phone" />
                        <div className="relative">
                            <div className="absolute end-0">
                                <label
                                    htmlFor="password"
                                    className="select-none block text-xs font-bold text-blue-700 dark:text-primary hover:font-semibold"
                                    onClick={handleGeneratePassword}
                                >
                                    {t("auth:GenPassword")}
                                </label>
                            </div>
                            <div className="relative">
                                <RHFInput
                                    required={true}
                                    name="password"
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                />
                                <span
                                    onClick={togglePasswordVisibility}
                                    className="absolute top-10 end-0 px-3 cursor-pointer text-gray-600 select-none"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-12 bg-gray-50 dark:bg-medium dark:border-t-2 dark:border-gray-700 rounded-b-2xl flex justify-end items-center pr-6 shadow-xl">
                    <button
                        type="submit"
                        className="px-2 py-1 bg-[#3F97DE] dark:bg-primary text-white rounded-lg hover:bg-primary"
                    >
                        Save
                    </button>
                </div>
            </FormProvider>
        </div>
    );
};

export default AddUser;

"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import s from "../../app/[locale]/login/page.module.css";
import { registerUser } from "@/app/api/users";
import { toastError, toastSuccess } from "../common/toast";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ReactLoading from "react-loading";
import { useAuth } from "@/context/auth-context";

interface FormData {
    fullname: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
}

const SignUpForm: React.FC = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { login } = useAuth();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue
    } = useForm<FormData>();

    const { t } = useTranslation();

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const { confirmPassword, ...userData } = data;
        setIsLoading(true);
        try {
            const response = await registerUser(userData);
            if (response.status === 201) {
                toastSuccess(t("auth:SignUpSuccess"));
                const token = response.data.access_token;
                login(token);
                return response.data;
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.detail || t("auth:SignUpFailed");
            toastError(errorMessage);
            console.error("Error submitting form", error);
        } finally {
            setIsLoading(false);
        }
    };

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
        setValue("confirmPassword", newPassword);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
            <div>
                <label htmlFor="fullname" className="flex text-xs font-medium text-gray-700 dark:text-gray-200">
                    {t("auth:Fullname")}
                    <p className="text-red-600 ml-1">*</p>
                </label>
                <input
                    type="text"
                    id="fullname"
                    {...register("fullname", {
                        required: t("auth:FullnameRequired")
                    })}
                    className={` ${s["input"]} mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-darker-950 rounded-md shadow-sm focus:outline-none sm:text-sm`}
                    placeholder={t("auth:Fullname")}
                />
                {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname.message}</p>}
            </div>
            <div>
                <label htmlFor="email" className="flex text-xs font-medium text-gray-700 dark:text-gray-200">
                    {t("auth:Email")}
                    <p className="text-red-600 ml-1">*</p>
                </label>
                <input
                    type="text"
                    id="email"
                    {...register("email", {
                        required: t("auth:EmailRequired"),
                        pattern: { value: /^\S+@\S+$/i, message: t("auth:InvalidEmail") }
                    })}
                    className={` ${s["input"]} mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-darker-950 rounded-md shadow-sm focus:outline-none sm:text-sm`}
                    placeholder={t("auth:Email")}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div>
                <label htmlFor="phone" className="block text-xs font-medium text-gray-700 dark:text-gray-200">
                    {t("auth:Phone")}
                </label>
                <input
                    type="tel"
                    id="phone"
                    {...register("phone", {
                        pattern: { value: /^\+?\d{10,15}$/, message: t("auth:InvalidPhone") }
                    })}
                    className={` ${s["input"]} mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-darker-950 rounded-md shadow-sm focus:outline-none sm:text-sm`}
                    placeholder={t("auth:Phone")}
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>
            <div>
                <div className="flex flex-row justify-between">
                    <label htmlFor="password" className="flex text-xs font-medium text-gray-700 dark:text-gray-200">
                        {t("auth:Password")}
                        <p className="text-red-600 ml-1">*</p>
                    </label>
                    <label
                        htmlFor="password"
                        className="select-none block text-xs font-bold text-blue-700"
                        onClick={handleGeneratePassword}
                    >
                        {t("auth:GenPassword")}
                    </label>
                </div>

                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        {...register("password", {
                            required: t("auth:PasswordRequired"),
                            minLength: { value: 8, message: t("auth:PasswordMinLength") }
                        })}
                        className={` ${s["input"]} mt-1 pr-8 block w-full px-3 py-2 border border-gray-300 dark:border-darker-950 rounded-md shadow-sm focus:outline-none sm:text-sm`}
                        placeholder={t("auth:Password")}
                    />
                    <span
                        style={{ userSelect: "none" }}
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer text-gray-600"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            <div>
                <label htmlFor="confirm-password" className="flex text-xs font-medium text-gray-700 dark:text-gray-200">
                    {t("auth:ConfirmPassword")}
                    <p className="text-red-600 ml-1">*</p>
                </label>
                <div className="relative">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirm-password"
                        {...register("confirmPassword", {
                            required: t("auth:ConfirmPasswordRequired"),
                            validate: (value) => value === watch("password") || t("auth:PasswordsMustMatch")
                        })}
                        className={` ${s["input"]} mt-1 pr-8 block w-full px-3 py-2 border border-gray-300 dark:border-darker-950 rounded-md shadow-sm focus:outline-none sm:text-sm`}
                        placeholder={t("auth:ConfirmPassword")}
                    />
                    <span
                        style={{ userSelect: "none" }}
                        onClick={toggleConfirmPasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer text-gray-600"
                    >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
            </div>
            <p className="text-xs pb-5 font-light text-gray-400 mb-12">{t("auth:SignUpDescription")}</p>
            <button
                type="submit"
                className={` ${s["btn"]} w-full py-2 px-4 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 flex justify-center items-center`}
                disabled={isLoading}
            >
                {isLoading ? (
                    <div className="flex items-center justify-center">
                        <ReactLoading type="spin" color="#fff" height={20} width={20} />
                    </div>
                ) : (
                    t("auth:SignUp")
                )}
            </button>

            <div className="text-center py-5">
                <p className="text-xs text-gray-400 dark:text-gray-200">{t("auth:Or")}</p>
                <button className="mt-4 flex items-center justify-center w-full py-2 px-4 border border-gray-300 dark:border-darker-950 dark:bg-medium-800 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white hover:bg-gray-50">
                    <Image src="https://www.google.com/favicon.ico" alt="Google Icon" width={20} height={20} />
                    {t("auth:SignWithGoogle")}
                </button>
            </div>

            <p className="text-sm text-center text-gray-400 dark:text-gray-200">
                {t("auth:AlreadyHaveAccount")}
                <Link href="/login" className="font-bold">
                    {t("auth:Login")}
                </Link>
            </p>
        </form>
    );
};

export default SignUpForm;

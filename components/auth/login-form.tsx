"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import s from "../../app/[locale]/login/page.module.css";
import { loginUser } from "@/app/api/users";
import { toastError, toastSuccess } from "../common/toast";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ReactLoading from "react-loading";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";

interface FormData {
    email: string;
    password: string;
}

const LoginForm: React.FC = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>();

    const { t } = useTranslation();

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setIsLoading(true);
            try {
                const response = await loginUser({
                    email: data.email,
                    password: data.password,
                });
                if (response.status === 201) {
                    toastSuccess(t("auth:LoginSuccess"));
                    const token = response.data.access_token;
                    login(token);
                    router.push("/"); 
                }
            } catch (error: any) {
                const errorMessage = error.response?.data?.detail || t("auth:LoginFailed");
                toastError(errorMessage);
                console.error("Error submitting form", error);
            } finally {
                setIsLoading(false);
            }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
            <div>
                <label htmlFor="email" className="block text-xs font-medium text-gray-700 dark:text-gray-200">
                    {t("auth:Email")}
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
                <label htmlFor="password" className="block text-xs font-medium text-gray-700 dark:text-gray-200">
                    {t("auth:Password")}
                </label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        {...register("password", {
                            required: t("auth:PasswordRequired")
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

            <div className="flex">
                <input type="checkbox" id="remember" />
                <label className="text-xs font-regular text-gray-500 dark:text-gray-200 ms-1">{t("auth:RememberMe")}</label>

                <Link href="/forgot-password" className="text-xs font-semibold text-gray-500 dark:text-gray-200 ms-auto">
                    {t("auth:ForgotPassword")}
                </Link>
            </div>

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
                    t("auth:Login")
                )}
            </button>

            <div className="text-center py-5">
                <p className="text-xs text-gray-400 dark:text-gray-200">{t("auth:Or")}</p>
                <button className="mt-5 flex items-center justify-center w-full py-2 px-4 border border-gray-300 dark:border-darker-950 dark:bg-darker-800 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white hover:bg-gray-50">
                    <Image src="https://www.google.com/favicon.ico" alt="Google Icon" width={20} height={20}/>
                    {t("auth:SignWithGoogle")}
                </button>
            </div>

            <p className="text-sm text-center text-gray-400 dark:text-gray-200v">
                {t("auth:NotRegistered")}
                <Link href="/login/signup" className="font-bold">
                    {t("auth:CreateAccount")}
                </Link>
            </p>
        </form>
    );
};

export default LoginForm;

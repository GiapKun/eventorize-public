import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface InputProps {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const RHFInput: React.FC<
  InputProps & React.InputHTMLAttributes<HTMLInputElement>
> = ({ name, label, required, className, ...props }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="text-left">
          <div className="mb-2">
            {label && (
              <label
                className="flex text-black dark:text-gray-400 text-sm font-medium mb-1"
                htmlFor={name}
              >
                {label}
                {required && <p className="text-red-600 ml-1">*</p>}
              </label>
            )}
            <input
              {...field}
              className={twMerge(
                `mt-1 p-2 w-full bg-[#EBF5FF] dark:bg-medium rounded-lg dark:border dark:border-gray-600 focus:outline-1 focus:outline-blue-400 ${
                  error ? "border-red-500" : ""
                }`, 
                className
              )}
              {...props}
            />
            {error && (
              <p className="text-red-500 text-sm mt-1">
                {error.message}
              </p>
            )}
          </div>
        </div>
      )}
    />
  );
};

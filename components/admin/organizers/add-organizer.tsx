"use client";

import FormProvider from "@/components/ui/form-provider";
import Image from "next/image";

import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { toastPromise } from "@/components/common/toast";
import { createOrganizer } from "@/app/api/organizers";
import { useCloseOnEsc } from "@/hooks/use-close-on-esc";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { RHFInput } from "@/components/ui/rhf-input";
import { yupResolver } from "@hookform/resolvers/yup";
import { organizerSchema } from "@/app/models/organizer/schema";
import { Organizer } from "@/app/models/organizer/organizer";

import { MdAddAPhoto } from "react-icons/md";

interface Props {
    onClose: () => void;
    onUpdate: () => void;
}

const AddOrganizer: React.FC<Props> = ({ onClose, onUpdate }) => {
    const { t } = useTranslation();
    const [image, setImage] = useState<string>("");

    const methods = useForm<Organizer>({
        resolver: yupResolver(organizerSchema)
    });

    const { handleSubmit } = methods;

    const onSubmit: SubmitHandler<Organizer> = async (data) => {
        try {
            onClose();
            await toastPromise(createOrganizer(data), {
                pending: "Creating organizer data...",
                success: "Organizer data created successfully",
                error: "Error creating organizer data"
            });
            onUpdate();
        } catch (error: any) {
            console.log("Error creating organizer data:", error);
        }
    };

    useCloseOnEsc(onClose);

    return (
        <div className="flex justify-center h-screen rounded-2xl overflow-y-scroll scrollbar-hide">
            <FormProvider
                className="w-full max-w-6xl m-auto shadow-b-xl"
                methods={methods}
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="sticky top-0 w-full h-12 bg-[#3F97DE] dark:bg-primary rounded-t-2xl flex justify-between items-center px-6 shadow-xl">
                    <p className="text-white font-medium">ADD NEW ORGANIZER</p>
                    <IoClose className="hover:rotate-90 duration-300" size={26} color="white" onClick={onClose} />
                </div>
                <div className="px-6 py-12 bg-white dark:bg-medium">
                    <div className="grid grid-cols-1 md:grid-cols-4 md:gap-6">
                        <div className="grid grid-cols-1 hover:shadow-orange-400">
                            <div className="space-y-1">
                                <label
                                    htmlFor="logo"
                                    className="block text-sm font-medium text-gray-700 dark:text-white"
                                >
                                    Logo
                                </label>
                                <div className="relative w-3/4 h-1/4 md:w-full md:h-1/3 min-h-44 rounded-2xl dark:bg-medium dark:border dark:border-gray-600">
                                    <Image
                                        src={image}
                                        alt="Logo"
                                        width={100}
                                        height={100}
                                        className={`w-full h-full rounded-2xl ${image ? "block" : "hidden"}`}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center hover:opacity-100 transition-opacity duration-300 rounded-full group">
                                        <input
                                            type="file"
                                            id="logo"
                                            {...methods.register("logo")}
                                            className="w-full h-full opacity-0 cursor-pointer z-50 rounded-full"
                                        />
                                        <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <MdAddAPhoto size={48} color="white" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 col-span-3">
                            <RHFInput required={true} label="Name" name="name" type="text" placeholder="Enter name" />
                            <RHFInput
                                required={true}
                                label="Email"
                                name="email"
                                type="text"
                                placeholder="Enter email"
                            />
                            <RHFInput label="Phone" name="phone" type="text" placeholder="Enter phone" />
                            <RHFInput
                                label="Description"
                                name="description"
                                type="text"
                                placeholder="Enter description"
                            />
                            <RHFInput label="District" name="district" type="text" placeholder="Enter district" />
                            <RHFInput label="Ward" name="ward" type="text" placeholder="Enter ward" />
                            <RHFInput label="City" name="city" type="text" placeholder="Enter city" />
                            <RHFInput label="Country" name="country" type="text" placeholder="Enter country" />
                            <RHFInput label="Facebook" name="facebook" type="text" placeholder="Enter facebook" />
                            <RHFInput label="Twitter" name="twitter" type="text" placeholder="Enter twitter" />
                            <RHFInput label="LinkedIn" name="linkedin" type="text" placeholder="Enter linkedin" />
                            <RHFInput label="Instagram" name="instagram" type="text" placeholder="Enter instagram" />
                        </div>
                    </div>
                </div>
                <div className="sticky bottom-0 w-full h-12 bg-gray-50 dark:bg-medium rounded-b-2xl flex justify-end items-center pr-6 shadow-xl">
                    <button type="submit" className="px-2 py-1 bg-[#3F97DE] text-white rounded-lg hover:bg-primary">
                        Create
                    </button>
                </div>
            </FormProvider>
        </div>
    );
};

export default AddOrganizer;

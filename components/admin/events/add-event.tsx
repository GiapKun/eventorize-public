"use client";

import Image from "next/image";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { toastPromise } from "@/components/common/toast";
import { creatEvent } from "@/app/api/events";
import { useCloseOnEsc } from "@/hooks/use-close-on-esc";
import { useTranslation } from "react-i18next";
import { RHFInput } from "@/components/ui/rhf-input";
import FormProvider from "@/components/ui/form-provider";
import { yupResolver } from "@hookform/resolvers/yup";
import { eventSchema } from "@/app/models/events/schema";
import { EventData } from "@/app/models/events/event";
import { Button } from "@/components/ui/button-comp";
import { MdAddAPhoto } from "react-icons/md";

interface EventsProps {
    onClose: () => void;
    onUpdate: () => void;
}

const EditEvent: React.FC<EventsProps> = ({ onClose, onUpdate }) => {
    const { t } = useTranslation();
    const [image, setImage] = useState<string>("");

    const methods = useForm<EventData>({
        resolver: yupResolver(eventSchema)
    });

    const { handleSubmit } = methods;

    const onSubmit: SubmitHandler<EventData> = async (data) => {
        try {
            onClose();
            await toastPromise(creatEvent(data), {
                pending: "Creating event data...",
                success: "Event data created successfully",
                error: "Error creating event data"
            });
            onUpdate();
        } catch (error: any) {
            console.log("Error creating event data:", error);
        }
    };

    useCloseOnEsc(onClose);

    return (
        <div className="flex justify-center h-screen overflow-y-scroll scrollbar-hide rounded-2xl duration-300">
            <FormProvider
                className="w-full max-w-6xl m-auto shadow-b-xl"
                methods={methods}
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="w-full sticky top-0 h-12 bg-primary rounded-t-2xl z-50 flex justify-between items-center px-6 shadow-xl">
                    <p className="text-white font-medium">ADD NEW EVENT</p>
                    <IoClose className="hover:rotate-90 duration-300" size={26} color="white" onClick={onClose} />
                </div>
                <div className="px-6 py-6 bg-white dark:bg-medium">
                    <div className="grid grid-cols-1 md:grid-cols-4 md:gap-6">
                        <div className="grid grid-cols-1 hover:shadow-orange-400">
                            <div className="space-y-1">
                                <label
                                    htmlFor="logo"
                                    className="block text-sm font-medium text-gray-700 dark:text-white"
                                >
                                    Thumbnail
                                </label>
                                <div className="relative w-3/4 h-1/4 md:w-full md:h-1/3 min-h-44 rounded-2xl dark:bg-medium border border-gray-200 dark:border-gray-600">
                                    <Image
                                        src={image}
                                        alt="Thumbnail"
                                        width={100}
                                        height={100}
                                        className={`w-full h-full rounded-2xl ${image ? "block" : "hidden"}`}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center hover:opacity-100 transition-opacity duration-300 rounded-full group">
                                        <input
                                            type="file"
                                            id="logo"
                                            {...methods.register("thumbnail")}
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
                            <RHFInput
                                label="Organizer Id"
                                name="organizer_id"
                                type="select"
                                placeholder="Enter organizer id"
                            />
                            <RHFInput label="Title" name="title" type="text" placeholder="Enter title" />
                            <RHFInput label="Link" name="link" type="url" placeholder="Enter link" />
                            <RHFInput label="Online?" name="is_online" type="checkbox" />
                            <RHFInput
                                label="Start Date"
                                name="start_date"
                                type="datetime-local"
                                placeholder="Enter start date"
                            />
                            <RHFInput
                                label="End Date"
                                name="end_date"
                                type="datetime-local"
                                placeholder="Enter end date"
                            />
                            <RHFInput label="Address" name="address" type="text" placeholder="Enter address" />
                            <RHFInput label="District" name="district" type="text" placeholder="Enter district" />
                            <RHFInput label="Ward" name="ward" type="text" placeholder="Enter ward" />
                            <RHFInput label="City" name="city" type="text" placeholder="Enter city" />
                            <RHFInput label="Country" name="country" type="text" placeholder="Enter country" />
                            <RHFInput
                                label="Description"
                                name="description"
                                type="text"
                                placeholder="Enter description"
                            />
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

export default EditEvent;
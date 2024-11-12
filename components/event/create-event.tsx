"use client";

import * as yup from "yup";

import React, { useEffect, useState } from "react";
import { ReactHookFormDemo } from "../common/input-file";
import FormProvider from "../ui/form-provider";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RHFInput } from "../ui/rhf-input";
import { EventData } from "@/app/models/events/event";
import { eventSchema } from "@/app/models/events/schema";
import { toastPromise } from "../common/toast";
import { creatEvent } from "@/app/api/events";
import { Textarea } from "../ui/text-area";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { getMe } from "@/app/api/users";
import { getOrganizers } from "@/app/api/organizers";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { getCoordinatesFromAddress } from "@/app/api/nominatim";
import { useRouter } from "next/navigation";

const customIcon = new L.Icon({
    iconUrl: "/vector.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
});

const CreateEvent = () => {
    const router = useRouter();
    const [isOnline, setIsOnline] = useState<boolean>(false);
    const [fullAddress, setFullAddress] = useState<string>("");
    const [image, setImage] = useState<string>("");

    const [organizers, setOrganizers] = useState([]);
    const [id, setId] = useState("");
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [selectedOrganizer, setSelectedOrganizer] = useState("");

    const [position, setPosition] = useState<[number, number] | null>(null);

    const methods = useForm<EventData>({
        resolver: yupResolver(eventSchema)
    });

    const handleFilesUploaded = (imageUrl: string) => {
        setImage(imageUrl);
        setValue("thumbnail", imageUrl ? "" : undefined);
    };


    const { handleSubmit, watch, register, setValue } = methods;

    const onSubmit: SubmitHandler<EventData> = async (data) => {
        try {
            await toastPromise(creatEvent(data), {
                pending: "Creating event data...",
                success: "Event data created successfully",
                error: "Error creating event data",
                onSuccess: (data) => {
                    router.push(`/`);
                }
            });
        } catch (error: any) {
            console.log("Error creating event data:", error);
        }
    };
    const address = watch("address");
    const ward = watch("ward");
    const district = watch("district");
    const city = watch("city");
    const country = watch("country");

    const fetchCoordinates = async (fullAddress: string) => {
        const coords = await getCoordinatesFromAddress(fullAddress);
        if (coords) {
            setPosition([coords[0], coords[1]] as [number, number]);
        }
    };

    useEffect(() => {
        const fullAddress = `${address ?? ""}, ${ward ?? ""}, ${district ?? ""}, ${city ?? ""}, ${country ?? ""}`;
        handleAdressChange(fullAddress);

        const timeoutId = setTimeout(() => {
            fetchCoordinates(fullAddress);
        }, 1000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [address, ward, district, city, country]);

    const handleAdressChange = (address: string) => {
        setFullAddress(`${address}`);
    };

    const getId = async () => {
        try {
            const response = await getMe();
            setId(response.data._id);
        } catch (error: any) {
            console.log("Error fetching user id:", error);
        }
    };

    const fetchOrganizers = async () => {
        try {
            const response = await getOrganizers({
                page: 1,
                limit: 20,
                sort_by: "created_by",
                order_by: "asc"
            });
            const data = response.data.results.map((item: any) => ({
                id: item._id,
                name: item.name,
                created_by: item.created_by
            }));
            setOrganizers(data);
            console.log(data);
        } catch (error: any) {
            console.log("Error fetching organizers:", error);
        }
    };

    useEffect(() => {
        getId();
    }, [isSelectOpen]);

    useEffect(() => {
        if (isSelectOpen && id) {
            fetchOrganizers();
        }
    }, [isSelectOpen, id]);

    const handleValueChange = (value: string) => {
        setSelectedOrganizer(value);
        setValue("organizer_id", value);
    };

    useEffect(() => {
        if (isOnline) {
            setValue("address", "");
            setValue("ward", "");
            setValue("district", "");
            setValue("city", "");
            setValue("country", "");
        } else {
            setValue("link", undefined);
        }
    }, [isOnline, setValue]);

    return (
        <>
            <div className="flex flex-col space-y-4 p-2 md:p-4 justify-center items-center w-full">
                <div className="w-full md:w-1/2 p-4 md:p-10 border-2 border-gray-300 dark:border-darker-900 rounded-lg">
                    <ReactHookFormDemo onFilesUploaded={handleFilesUploaded} />
                </div>
                <FormProvider
                    className="flex flex-col w-full space-y-4  justify-center items-center shadow-b-xl"
                    methods={methods}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="w-full md:w-1/2 p-4 md:p-10 border-2 border-gray-300 dark:border-darker-900 rounded-lg">
                        <RHFInput
                            required
                            name="title"
                            type="text"
                            label="Title"
                            placeholder="Enter title"
                            className="bg-white border border-gray-200"
                        />
                        <div className="flex dark:text-gray-500 text-sm text-black font-medium mb-2">
                            Description<p className="text-red-600 ml-1">*</p>
                        </div>
                        <Textarea
                            {...register("description")}
                            required
                            placeholder="Enter description here."
                            className="mb-2 dark:border-gray-600 dark:bg-medium"
                        />
                        <div className="grid grid-cols-2 space-x-4">
                            <RHFInput
                                required
                                name="start_date"
                                type="datetime-local"
                                label="Start Date"
                                placeholder="Enter start date"
                                className="bg-white border border-gray-200"
                            />
                            <RHFInput
                                required
                                name="end_date"
                                type="datetime-local"
                                label="End Date"
                                placeholder="Enter end date"
                                className="bg-white border border-gray-200"
                            />
                        </div>
                        <div className="flex flex-col justify-between w-full">
                            <div className="grid grid-cols-2">
                                <div>
                                    <div className="flex dark:text-gray-500 text-sm text-black font-medium mb-2">
                                        Online <p className="text-red-600 ml-1">*</p>
                                    </div>
                                    <Switch
                                        checked={isOnline}
                                        onCheckedChange={(checked) => {
                                            setIsOnline(checked);
                                            setValue("is_online", checked);
                                        }}
                                        className="bg-gray-300 my-2"
                                    />
                                </div>
                                <div className="ml-4">
                                    <div className="flex items-center justify-start dark:text-gray-500 text-sm text-black font-medium mb-2">
                                        Select organizer<p className="text-red-600 ml-1 mr-4">*</p>
                                    </div>
                                    <div className="mb-2">
                                        <Select
                                            open={isSelectOpen}
                                            onOpenChange={setIsSelectOpen}
                                            value={selectedOrganizer}
                                            onValueChange={handleValueChange}
                                            {...register("organizer_id")}
                                        >
                                            <SelectTrigger className="w-full dark:border-gray-600">
                                                <SelectValue placeholder="Select an organizer" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Organizers</SelectLabel>
                                                    {organizers.map((organizer: any) => (
                                                        <SelectItem key={organizer.id} value={organizer.id}>
                                                            {organizer.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            {isOnline ? (
                                <div className="w-full">
                                    <RHFInput
                                        name="link"
                                        type="url"
                                        label="Link"
                                        placeholder="Enter link to event"
                                        className="bg-white border border-gray-200"
                                    />
                                </div>
                            ) : (
                                <div className="w-full p-4 md:p-10 border-2 border-gray-300 dark:border-darker-900 rounded-lg">
                                    <div className="grid grid-cols-2">
                                        <div className="col-span-2">
                                            <RHFInput
                                                name="address"
                                                type="text"
                                                label="Address"
                                                placeholder="Enter address to event"
                                                className="bg-white border border-gray-200"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 space-x-4">
                                        <RHFInput
                                            name="ward"
                                            type="text"
                                            label="Ward"
                                            placeholder="Enter ward to event"
                                            className="bg-white border border-gray-200"
                                        />
                                        <RHFInput
                                            name="district"
                                            type="text"
                                            label="District"
                                            placeholder="Enter district to event"
                                            className="bg-white border border-gray-200"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 space-x-4">
                                        <RHFInput
                                            name="city"
                                            type="text"
                                            label="City"
                                            placeholder="Enter city to event"
                                            className="bg-white border border-gray-200"
                                        />
                                        <RHFInput
                                            name="country"
                                            type="text"
                                            label="Country"
                                            placeholder="Enter country to event"
                                            className="bg-white border border-gray-200"
                                        />
                                    </div>
                                    <div>
                                        <div className="map-wrapper w-full md:w-auto">
                                            {position && (
                                                <MapContainer
                                                    center={position}
                                                    zoom={13}
                                                    style={{ height: "300px", width: "100%", borderTopLeftRadius: "10px", borderTopRightRadius: "10px", zIndex: 10 }}
                                                >
                                                    <TileLayer
                                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                    />
                                                    <Marker position={position} icon={customIcon}>
                                                        <Popup>{fullAddress}</Popup>
                                                    </Marker>
                                                </MapContainer>
                                            )}
                                            <div className="event-details p-4 bg-gray-100 rounded-b-lg ">
                                                <div className="location text-gray-700 mt-2 flex items-center">
                                                    <FaMapMarkerAlt className="text-gray-600" />
                                                    <div className="ml-3 text-sm sm:text-base">
                                                        <div>{fullAddress}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <Button className="w-fit bg-primary text-white mt-4">Create</Button>
                        </div>
                    </div>
                </FormProvider>
            </div>
        </>
    );
};

export default CreateEvent;

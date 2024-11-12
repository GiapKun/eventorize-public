"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getEvents } from "@/app/api/events";
import EventCard from "./common/event-card";
import Link from "next/link";
import { FaAngleDown } from "react-icons/fa";

const HomePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [events, setEvents] = useState([
        {
            _id: "1",
            title: "HortEx VietNam 2025",
            date: "Wed, Mar 12 - 9:00 AM",
            location: "Saigon Exhibition",
            price: "Free",
            imageSrc: "/image.png"
        }
    ]);

    useEffect(() => {
        const fetchEvents = async () => {
            setIsLoading(true);
            try {
                const response = await getEvents({ page: 1, limit: 10 });
                const eventsData = response.data.results.map((event: any) => ({
                    _id: event._id,
                    title: event.title,
                    date: new Date(event.start_date).toLocaleDateString(),
                    location: event.location || "Unknown location",
                    price: event.price || "Free",
                    imageSrc:
                        event.thumbnail && event.thumbnail.startsWith("http")
                            ?  event.thumbnail
                            : "/image.png"
                }));
                setEvents(eventsData);
            } catch (error) {
                console.error("Failed to fetch events:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className="mt-8">
            <div className="w-full h-auto flex flex-col mb-8 relative">
                <div className="w-full">
                    <Image
                        className="w-full h-[280px] object-cover"
                        src="/banner.webp"
                        alt="banner"
                        width={1400}
                        height={470}
                    />
                </div>
                <div className="absolute left-0 bottom-0 w-full">
                    <div className="max-w-[1440px] mx-auto px-8 py-8">
                        <div className="w-28 h-12 flex justify-center items-center text-sm rounded-xl bg-primary text-white cursor-pointer">
                            <p>Find event</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full h-[50px] border-y">
                <div className="max-w-[1440px] flex items-center mx-auto py-4 px-4 sm:px-6 lg:px-4">
                    <p>Browsing events in</p>
                    <p className="flex items-center ml-4 text-[#3F97DE] underline">
                        <span className="mr-1">
                            <FaAngleDown />
                        </span>
                        Location
                    </p>
                </div>
            </div>

            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4">
                <div className=" py-12 overflow-x-auto">
                    <div className="h-[30px] flex justify-center items-center min-w-max">
                        <p className="font-light mr-8 cursor-pointer hover:text-black hover:font-normal text-[#3F97DE] underline">
                            All
                        </p>
                        <p className="font-light mr-8 cursor-pointer hover:text-black hover:font-normal text-[#545454]">
                            For you
                        </p>
                        <p className="font-light mr-8 cursor-pointer hover:text-black hover:font-normal text-[#545454]">
                            Online
                        </p>
                        <p className="font-light mr-8 cursor-pointer hover:text-black hover:font-normal text-[#545454]">
                            Today
                        </p>
                        <p className="font-light mr-8 cursor-pointer hover:text-black hover:font-normal text-[#545454]">
                            This weekend
                        </p>
                        <p className="font-light mr-8 cursor-pointer hover:text-black hover:font-normal text-[#545454]">
                            Free
                        </p>
                        <p className="font-light mr-8 cursor-pointer hover:text-black hover:font-normal text-[#545454]">
                            Music
                        </p>
                        <p className="font-light mr-8 cursor-pointer hover:text-black hover:font-normal text-[#545454]">
                            Food & Drink
                        </p>
                        <p className="font-light mr-8 cursor-pointer hover:text-black hover:font-normal text-[#545454]">
                            Charity & Causes
                        </p>
                    </div>
                </div>
                {isLoading ? (
                    <div className="w-full h-full mx-auto p-4">
                        <div className="animate-pulse flex space-x-4">
                            <div className="rounded-lg bg-gray-300 h-48 w-full"></div>
                        </div>
                    </div>
                ) : (
                    <div className=" px-2 sm:px-6 lg:px-14">
                        <div className="w-full mx-auto mb-8 ">
                            <p className="flex justify-between mb-6">
                                <span className="font-semibold text-3xl">Popular event near location</span>
                                <span className="text-[#545454] text-sm cursor-pointer">
                                    Explore more events {">>"}
                                </span>
                            </p>

                            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-items-center">
                                {events.map((event, index) => (
                                    <EventCard
                                        id={event._id}
                                        key={index}
                                        title={event.title}
                                        date={event.date}
                                        location={event.location}
                                        price={event.price}
                                        imageSrc={event.imageSrc}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="border-t pt-6">
                            <div className="w-full mx-auto mb-8">
                                <p className="flex justify-between">
                                    <span className="font-semibold text-3xl">More events</span>
                                </p>
                                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-items-center">
                                    {events.map((event, index) => (
                                        <Link key={index} href={`/events/${event._id}`}>
                                            <EventCard
                                                id={event._id}
                                                key={index}
                                                title={event.title}
                                                date={event.date}
                                                location={event.location}
                                                price={event.price}
                                                imageSrc={event.imageSrc}
                                            />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="my-8 flex justify-center">
                <div className="w-[200px] h-[50px] bg-primary text-white rounded-xl flex items-center justify-center cursor-pointer">
                    See more
                </div>
            </div>
        </div>
    );
};

export default HomePage;

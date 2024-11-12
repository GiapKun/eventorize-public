"use client";
import Image from "next/image";
import LikeButton from "@/components/icon/LikeButton";
import ShareButton from "@/components/icon/ShareButton";
import TicketList from "@/components/detail-event/TicketList";
import CategoryTags from "@/components/detail-event/CategoryTags ";
import Organizer from "@/components/detail-event/Organizer";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { getEvents } from "@/app/api/events";
import { getOrganizer } from "@/app/api/organizers";
import EventCard from "@/components/common/event-card";
const MapComponent = dynamic(() => import('@/components/detail-event/MapComponent '), { ssr: false });

interface EventDetailsProps {
    event: {
        _id: string;
        organizer_id: string;
        title: string;
        thumbnail: string;
        description: string;
        link: string;
        start_date: string;
        end_date: string;
        is_online: boolean;
        address: string;
        district: string;
        ward: string;
        city: string;
        country: string;
    };
}

const EventDetails: React.FC<EventDetailsProps> = ({ event }) => {
    const fullAddress = `${event.address}, ${event.ward}, ${event.district}, ${event.city}, ${event.country}`;

    const [events, setEvents] = useState([
        {
            id: "event001",
            title: "HortEx VietNam 2025",
            date: "Wed, Mar 12 - 9:00 AM",
            location: "Saigon Exhibition",
            price: "Free",
            imageSrc: "/image.png"
        }
    ]);

    const [organizer, setOrganizer] = useState({
        id: "organizer001",
        name: "Organizer name",
        avatar: "/image.png",
        description: "Organizer description",
        socials: {
            facebook: "",
            twitter: "",
            linkedin: "",
            instagram: ""
        }
    });

    useEffect(() => {
        const fetchOrganizer = async () => {
            try {
                const response = await getOrganizer(event.organizer_id);
                console.log(response.data);
                setOrganizer({
                    id: response.data._id,
                    name: response.data.name,
                    avatar: response.data.logo && response.data.logo.startsWith("http") ?  response.data.logo: "/image.png",
                    description: response.data.description,
                    socials: {
                        facebook: response.data.facebook || "",
                        twitter: response.data.twitter || "",
                        linkedin: response.data.linkedin || "",
                        instagram: response.data.instagram || ""
                    }
                });
            } catch (error) {
                console.error("Failed to fetch organizer:", error);
            }
        };

        fetchOrganizer();
    }, [event.organizer_id]);

    return (
        <div className="my-[50px] 2xl:mx-[200px] xl:mx-[50px] sm:mx-2 ">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 p-4 lg:p-8">
                <div className="lg:col-span-3 flex flex-col gap-y-7">
                    <div className="img-event">
                        <Image
                            className="rounded-2xl"
                            src={event.thumbnail && event.thumbnail.startsWith("http") ? event.thumbnail : "/image.png"}
                            alt=""
                            width={900}
                            height={430}
                            layout="responsive"
                            unoptimized
                        />
                    </div>
                    <div className="underImg">
                        <div className="first flex flex-col lg:flex-row justify-between items-start lg:items-center gap-y-3 mb-7">
                            <div className="title text-2xl lg:text-4xl font-bold">{event.title}</div>
                            <div className="flex flex-row items-start lg:items-center mt-4 lg:mt-0">
                                <div className="like mb-2 lg:mb-0 mr-4 sm:content-center ">
                                    <LikeButton />
                                </div>
                                <div className="share-btn">
                                    <ShareButton />
                                </div>
                            </div>
                        </div>
                        <div className="description mb-7 text-sm lg:text-base">{event.description}</div>
                        {/* <TicketList tickets={event.tickets} /> */}
                    </div>
                </div>
                <div className="lg:col-span-2 w-full mt-4 lg:mt-0">
                    <MapComponent fullAddress={fullAddress} startDate={event.start_date}  endDate={event.end_date}/>

                    {/* <CategoryTags categories={event.category} /> */}
                    <Organizer
                        name={organizer.name}
                        img={organizer.avatar}
                        description={organizer.description}
                        socialLinks={organizer.socials}
                    />
                </div>
            </div>
            <div className="border-t pt-6">
                <div className="w-full mx-auto mb-8">
                    <p className="flex justify-between">
                        <span className="font-semibold text-3xl">People are also interested in</span>
                        <span className="text-[#545454] text-sm cursor-pointer"> More events {">>"}</span>
                    </p>
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-items-center">
                        {events.map((event, index) => (
                            <EventCard
                                id={event.id}
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
            </div>
        </div>
    );
};
export default EventDetails;

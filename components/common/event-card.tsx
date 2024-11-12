"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface EventCardProps {
    id: string;
    title: string;
    date: string;
    location: string;
    price: string;
    imageSrc: string;
}

const EventCard = ({ id , title, date, location, price, imageSrc }: EventCardProps) => {
    const router = useRouter();

    const handleClick = () => {
        router.push("/event/" + id);
    };

    return (
        <div className="w-72 h-auto hover:shadow-lg rounded-lg cursor-pointer" onClick={handleClick}>
            <Image className="rounded-lg max-h-44 mb-4" unoptimized src={imageSrc} alt="event img" width={330} height={170} />
            <div className="p-4">
                <p className="font-semibold text-xl">{title}</p>
                <div className="mt-8">
                    <p className="font-semibold text-xs">{date}</p>
                    <p className="my-2">{location}</p>
                    <span className="font-semibold">{price}</span>
                </div>
            </div>
        </div>
    );
};

export default EventCard;

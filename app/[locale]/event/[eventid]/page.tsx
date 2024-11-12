"use client";
import EventDetails from "./event-details";
import { getEvent } from "@/app/api/events";

interface IParams {
    eventid: string;
}

const Event = async ({ params }: { params: IParams }) => {
    const { eventid } = params;

    try {
        console.log("Fetching event:", eventid);
        const response = await getEvent(eventid);
        const eventData = response.data;

        if (!eventData) {
            return <div>Event not found</div>;
        }

        return (
            <div className="event-container">
                <EventDetails event={eventData} />
            </div>
        );
    } catch (error) {
        console.error("Failed to fetch event:", error);
        return <div>Error loading event: {error instanceof Error ? error.message : "Unknown error"}</div>;
    }
};

export default Event;

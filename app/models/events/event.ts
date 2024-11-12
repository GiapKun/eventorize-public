export type EventData = {
    organizer_id: string;
    title: string;
    thumbnail?: string;
    description: string;
    link?: string;
    start_date: string;
    end_date: string;
    is_online: boolean;
    address?: string;
    district?: string;
    ward?: string;
    city?: string;
    country?: string;
};


export type UpdateData = {
    id: string;
    organizer_id?: string;
    title?: string;
    thumbnail?: string;
    description?: string;
    link?: string;
    start_date?: string;
    end_date?: string;
    is_online?: boolean;
    address?: string;
    district?: string;
    ward?: string;
    city?: string;
    country?: string;
};

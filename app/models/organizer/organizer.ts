export type Organizer = {
    id: string;
    name: string;
    email: string;
    logo?: string | null;
    phone?: string | null;
    description?: string | null;
    district?: string | null;
    ward?: string | null;
    city?: string | null;
    country?: string | null;
    facebook?: string | null;
    twitter?: string | null;
    linkedin?: string | null;
    instagram?: string | null;
};

export type UpdateData = Partial<Omit<Organizer, 'id'>> & { id: string; };

export type LoginData = {
    email: string;
    password: string;
};

export type RegisterUserData = {
    fullname: string;
    email: string;
    phone?: string | null;
    password: string;
};

export type UserData = RegisterUserData & {
    id: string;
    position?: string | null;
    company?: string | null;
    district?: string | null;
    ward?: string | null;
    city?: string | null;
    country?: string | null;
    facebook?: string | null;
    twitter?: string | null;
    linkedin?: string | null;
    instagram?: string | null;
    avatar?: string | null;
};

export type GetUsersParams = {
    search?: string;
    page?: number;
    limit?: number;
    fields?: string;
    sort_by?: string;
    order_by?: "asc" | "desc";
    additionalParams?: Record<string, string | number>;
};

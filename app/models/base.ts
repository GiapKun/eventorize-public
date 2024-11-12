export type GetParams = {
    search?: string;
    page?: number;
    limit?: number;
    fields?: string;
    sort_by?: string;
    order_by?: "asc" | "desc";
    additionalParams?: Record<string, string | number>;
};
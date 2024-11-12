
export type RoleData = {
    name: string;
    description: string;
    parent_role_id: string;
    parent_role_name: string;
    user_type: string;
    is_hidden: boolean;
    status: string;
    permissions: Permission[];
};

export type Permission = {
    _id: string;
    status: string;
    is_denied: boolean;
};

export type GetRolesParams = {
    search?: string;
    page?: number;
    limit?: number;
    fields?: string;
    sort_by?: string;
    order_by?: "asc" | "desc";
    additionalParams?: Record<string, string | number>;
};

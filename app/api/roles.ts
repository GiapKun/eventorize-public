import apiClient from "./api-client";
import { RoleData, GetRolesParams } from "../models/role/role";

export const getMyRole = async () => {
    return apiClient.get("/v1/roles/me");
};

export const getRoles = async (params: GetRolesParams = {}) => {
    return apiClient.get("/v1/roles", { params });
};

export const getRole = async (roleId: string) => {
    return apiClient.get(`/v1/roles/${roleId}`);
};

export const createRole = async (roleData: RoleData) => {
    return apiClient.post("/v1/roles", roleData);
};
export const updateRole = async (roleId: string, roleData: Partial<RoleData>) => {
    return apiClient.put(`/v1/roles/${roleId}`, roleData);
};

export const deleteRole = async (roleId: string) => {
    return apiClient.delete(`/v1/roles/${roleId}`);
};

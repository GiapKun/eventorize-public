import apiClient from "./api-client";
import { PermissionData } from "../models/permission/permission";
import { GetParams } from "../models/base";

export const createPermission = async (permData: PermissionData) => {
    return apiClient.post("/v1/permissions", permData);
};

export const getPermissions = async (params: GetParams = {}) => {
    return apiClient.get("/v1/permissions", { params });
};

export const getPermission = async (permId: string) => {
    return apiClient.get(`/v1/permissions/${permId}`);
};

export const updatePermission = async (permId: string, permData: Partial<PermissionData>) => {
    return apiClient.put(`/v1/permissions/${permId}`, permData);
};

export const deletePermission = async (permId: string) => {
    return apiClient.delete(`/v1/permissions/${permId}`);
};

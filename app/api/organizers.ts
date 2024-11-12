import apiClient from "./api-client";
import { Organizer } from "../models/organizer/organizer";
import { GetParams } from "../models/base";

export const createOrganizer = async (data: Organizer) => {
    return apiClient.post("/v1/organizers", data);
};

export const getOrganizers = async (params: GetParams = {}) => {
    return apiClient.get("/v1/organizers", { params });
};

export const getOrganizer = async (id: string) => {
    return apiClient.get(`/v1/organizers/${id}`);
};

export const updateOrganizer = async (id: string, data: Partial<Organizer>) => {
    return apiClient.put(`/v1/organizers/${id}`, data);
};

export const deleteOrganizer = async (id: string) => {
    return apiClient.delete(`/v1/organizers/${id}`);
};

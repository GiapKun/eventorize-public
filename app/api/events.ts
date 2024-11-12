import apiClient from "./api-client";
import { EventData, UpdateData } from "../models/events/event";
import { GetParams } from "../models/base";

export const creatEvent = async (data: EventData) => {
    return apiClient.post("/v1/events", data);
};

export const getEvents = async (params: GetParams = {}) => {
    return apiClient.get("/v1/events", { params });
};

export const getEvent = async (id: string) => {
    return apiClient.get(`/v1/events/${id}`);
};

export const updateEvent = async (id: string, data: Partial<UpdateData>) => {
    return apiClient.put(`/v1/events/${id}`, data);
};

export const deleteEvent = async (id: string) => {
    return apiClient.delete(`/v1/events/${id}`);
};

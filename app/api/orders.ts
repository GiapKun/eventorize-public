import apiClient from "./api-client";
import { GetParams } from "../models/base";

export const acceptOrder = async (id: string) => {
    return apiClient.post(`/v1/orders/${id}/accept`);
}

export const getOrders = async (params: GetParams = {}) => {
    return apiClient.get("/v1/orders", { params });
};

export const getOrder = async (id: string) => {
    return apiClient.get(`/v1/orders/${id}`);
};

export const deleteOrder = async (id: string) => {
    return apiClient.delete(`/v1/orders/${id}`);
};

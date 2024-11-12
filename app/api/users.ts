import apiClient from "./api-client";
import { LoginData, RegisterUserData, UserData, GetUsersParams } from "../models/user/user";


export const getMe = async () => {
    return apiClient.get("/v1/users/me");
};

export const loginUser = async (loginData: LoginData) => {
    return apiClient.post("/v1/users/login", loginData);
};

export const registerUser = async (userData: RegisterUserData) => {
    return apiClient.post("/v1/users/register", userData);
};

export const getUsers = async (params: GetUsersParams = {}) => {
    return apiClient.get("/v1/users", { params });
};

export const getUser = async (userId: string) => {
    return apiClient.get(`/v1/users/${userId}`);
};

export const updateUser = async (userId: string, userData: Partial<UserData>) => {
    return apiClient.put(`/v1/users/${userId}`, userData);
};

export const deleteUser = async (userId: string) => {
    return apiClient.delete(`/v1/users/${userId}`);
};

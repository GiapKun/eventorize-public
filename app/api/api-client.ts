import axios, { AxiosError } from "axios";

export type ErrorResponse = {
    message: string;
    code: number;
    debug: string;
    status: string;
};

export function HandleError(err: Error | AxiosError<ErrorResponse>): ErrorResponse {
    if (axios.isAxiosError(err)) {
        return err.response?.data || {
            message: "An error occurred",
            code: err.response?.status || 500,
            debug: err.message,
            status: "error",
        };
    } else {
        const error: ErrorResponse = {
            message: "Unknown Error",
            code: 500,
            debug: err.message,
            status: "error",
        };
        return error;
    }
}

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, 
    headers: {
        "Content-Type": "application/json",
    },
});



apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;

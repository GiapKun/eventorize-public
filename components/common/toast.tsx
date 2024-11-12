import { toast } from "react-toastify";

export const toastWarn = (message: string) => {
    return toast.warn(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light"
    });
};
export const toastError = (message: string) => {
    return toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light"
    });
};
export const toastSuccess = (message: string) => {
    return toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light"
    });
};
export const toastInfo = (message: string) => {
    return toast.info(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light"
    });
};

interface ToastPromiseOptions<T> {
    pending?: string;
    success?: string;
    error?: string;
    onPending?: () => void;
    onSuccess?: (result: T) => void;
    onError?: (error: any) => void;
}

export const toastPromise = <T,>(promise: Promise<T>, options: ToastPromiseOptions<T>): Promise<T> => {

    options.onPending?.();

    return toast.promise<T>(
        promise
            .then((result) => {
                options.onSuccess?.(result);
                return result;
            })
            .catch((error) => {
                options.onError?.(error);
                throw error;
            }),
        {
            pending: options.pending || "Loading...",
            success: options.success || "Operation successful!",
            error: options.error || "Something went wrong."
        },
        {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light"
        }
    );
};

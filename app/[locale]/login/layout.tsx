import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GuestGuard from "@/components/auth/guest-guard";

export default function AuthRootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <GuestGuard>{children}</GuestGuard>
            <ToastContainer />
        </>
    );
}

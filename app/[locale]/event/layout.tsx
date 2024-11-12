import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import GuestOnlyGuard from "@/components/auth/guest-only-guard";
import { Toaster } from "@/components/ui/sonner";

export default function EventRootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <GuestOnlyGuard>
                <Header />
                {children}
                <Footer />
                <ToastContainer />
                <Toaster />
            </GuestOnlyGuard>
        </>
    );
}

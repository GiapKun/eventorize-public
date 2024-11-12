import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import AuthGuard from "@/components/auth/auth-guard";

export default function EventRootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AuthGuard>
                <Header />
                {children}
                <Footer />
            </AuthGuard>
        </>
    );
}

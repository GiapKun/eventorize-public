import React from "react";
import initTranslation from "../i18n";
import TranslationsProvider from "@/components/providers/translation-provider";
import HomePage from "@/components/home-page";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import GuestOnlyGuard from "@/components/auth/guest-only-guard";


interface HomeProps {
    params: {
        locale: string;
    };
}

const i18nNamespaces = ["default", "auth"];

export default async function Home({ params: { locale } }: HomeProps) {
    const { t, resources } = await initTranslation(locale, i18nNamespaces);

    return (
        <TranslationsProvider resources={resources} locale={locale} namespaces={i18nNamespaces}>
            <GuestOnlyGuard>
                <div id="root">
                    <Header />
                    <HomePage />
                    <Footer />
                </div>
            </GuestOnlyGuard>
        </TranslationsProvider>
    );
}

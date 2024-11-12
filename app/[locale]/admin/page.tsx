import React from "react";
import initTranslation from "../../i18n";
import TranslationsProvider from "@/components/providers/translation-provider";
import Dashboard from "@/components/admin/dashboard/dashboard";
import Header from "@/components/admin/layout/header";

interface AdminProps {
    params: {
        locale: string;
    };
}

const i18nNamespaces = ["default", "auth"];

export default async function DashboardPage({ params: { locale } }: AdminProps) {
    const { t, resources } = await initTranslation(locale, i18nNamespaces);

    return (
        <TranslationsProvider resources={resources} locale={locale} namespaces={i18nNamespaces}>
            <Dashboard />
        </TranslationsProvider>
    );
}

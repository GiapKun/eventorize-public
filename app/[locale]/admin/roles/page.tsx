import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/providers/translation-provider";
import LoginForm from "@/components/auth/login-form";
import Image from "next/image";
import Link from "next/link";
import Role from "@/components/admin/roles/role";

interface RoleProps {
    params: {
        locale: string;
    };
}

const i18nNamespaces = ["default", "auth"];

export default async function RolesPage({ params: { locale } }: RoleProps) {
    const { t, resources } = await initTranslations(locale, i18nNamespaces);

    return (
        <TranslationsProvider resources={resources} locale={locale} namespaces={i18nNamespaces}>
            <div>
                <Role />
            </div>
        </TranslationsProvider>
    );
}

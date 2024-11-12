import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/providers/translation-provider";
import Users from "@/components/admin/users/users";

interface UserProps {
    params: {
        locale: string;
    };
}

const i18nNamespaces = ["default", "auth"];

export default async function UsersPage({ params: { locale } }: UserProps) {
    const { t, resources } = await initTranslations(locale, i18nNamespaces);

    return (
        <TranslationsProvider resources={resources} locale={locale} namespaces={i18nNamespaces}>
            <div className="flex">
                <Users />
            </div>
        </TranslationsProvider>
    );
}

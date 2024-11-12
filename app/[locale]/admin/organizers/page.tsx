import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/providers/translation-provider";
import Organizers from "@/components/admin/organizers/organizers";

interface OrganizerProps {
    params: {
        locale: string;
    };
}

const i18nNamespaces = ["default", "auth"];

export default async function OrganizersPage({ params: { locale } }: OrganizerProps) {
    const { t, resources } = await initTranslations(locale, i18nNamespaces);

    return (
        <TranslationsProvider resources={resources} locale={locale} namespaces={i18nNamespaces}>
            <div>
                <Organizers />
            </div>
        </TranslationsProvider>
    );
}

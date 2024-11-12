import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/providers/translation-provider";
import Events from "@/components/admin/events/events";

interface EventProps {
    params: {
        locale: string;
    };
}

const i18nNamespaces = ["default", "auth"];

export default async function EventsPage({ params: { locale } }: EventProps) {
    const { t, resources } = await initTranslations(locale, i18nNamespaces);

    return (
        <TranslationsProvider resources={resources} locale={locale} namespaces={i18nNamespaces}>
            <div className="flex">
                <Events />
            </div>
        </TranslationsProvider>
    );
}

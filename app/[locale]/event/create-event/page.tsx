import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/providers/translation-provider";
import CreateEvent from "@/components/event/create-event";
import AuthGuard from "@/components/auth/auth-guard";

interface EventProps {
    params: {
        locale: string;
    };
}

const i18nNamespaces = ["default", "auth"];

export default async function CreateEventPage({ params: { locale } }: EventProps) {
    const { t, resources } = await initTranslations(locale, i18nNamespaces);

    return (
        <TranslationsProvider resources={resources} locale={locale} namespaces={i18nNamespaces}>
            <AuthGuard>
                <div className="flex">
                    <CreateEvent />
                </div>
            </AuthGuard>
        </TranslationsProvider>
    );
}

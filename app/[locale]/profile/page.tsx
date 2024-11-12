import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/providers/translation-provider";


interface ProfileProps {
    params: {
        locale: string;
    };
}

const i18nNamespaces = ["default", "auth"];

export default async function ProfilePage({ params: { locale } }: ProfileProps) {
    const { t, resources } = await initTranslations(locale, i18nNamespaces);

    return (
        <TranslationsProvider resources={resources} locale={locale} namespaces={i18nNamespaces}>
            <div>

            </div>
        </TranslationsProvider>
    );
}

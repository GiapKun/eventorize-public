import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/providers/translation-provider";
import Orders from "@/components/admin/orders/orders";

interface OrdersProps {
    params: {
        locale: string;
    };
}

const i18nNamespaces = ["default", "auth"];

export default async function OrdersPage({ params: { locale } }: OrdersProps) {
    const { t, resources } = await initTranslations(locale, i18nNamespaces);

    return (
        <TranslationsProvider resources={resources} locale={locale} namespaces={i18nNamespaces}>
            <div className="flex">
                <Orders />
            </div>
        </TranslationsProvider>
    );
}

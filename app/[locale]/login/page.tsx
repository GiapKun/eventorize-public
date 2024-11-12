import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/providers/translation-provider";
import LoginForm from "@/components/auth/login-form";
import Image from "next/image";
import Link from "next/link";

interface SignUpProps {
    params: {
        locale: string;
    };
}

const i18nNamespaces = ["default", "auth"];

export default async function SignUp({ params: { locale } }: SignUpProps) {
    const { t, resources } = await initTranslations(locale, i18nNamespaces);

    return (
        <TranslationsProvider resources={resources} locale={locale} namespaces={i18nNamespaces}>
            <main>
                <div className="w-screen h-screen z-0 fixed">
                    <Image className="blur-sm" src="/image.png" alt="image" layout="fill" objectFit="cover" />
                </div>
                <div className="min-h-screen bg-gray-100  flex items-center justify-center">
                    <div className="flex-1 max-w-2xl w-screen"></div>
                    <div className="z-10 py-14 px-14 flex flex-col items-center w-full max-w-lg p-6 bg-white dark:bg-medium shadow-lg rounded-xl m-6">
                        <Link href="/">
                            <p className="text-4xl font-bold text-primary font-jua mb-12">eventorize</p>
                        </Link>
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-200 mb-6">{t("auth:LoginWelcome")}</h2>
                        <LoginForm />
                    </div>
                </div>
            </main>
        </TranslationsProvider>
    );
}

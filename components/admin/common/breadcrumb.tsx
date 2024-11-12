import Link from "next/link";

interface BreadcrumbProps {
    pageName: string;
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
    return (
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center ">
            <nav>
                <ol className="flex items-center gap-2">
                    <li>
                        <Link className="font-medium hover:font-bold text-gray-500" href="/admin">
                            Home /
                        </Link>
                    </li>
                    <li className="font-medium hover:font-bold text-primary">{pageName}</li>
                </ol>
            </nav>
        </div>
    );
};

export default Breadcrumb;

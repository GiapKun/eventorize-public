// "use client";

// import { useRouter } from "next/navigation";
// import { usePathname } from "next/navigation";
// import { useTranslation } from "next-i18next";
// import { FaAngleDown } from "react-icons/fa";
// import { Icon } from "@iconify/react";
// import useDropdown from "../../hooks/use-dropdown";
// import i18nConfig from "@/i18nConfig";

// const LanguageDropdown: React.FC = () => {
//     const { i18n } = useTranslation();
//     const router = useRouter();
//     const pathname = usePathname();
//     const { isOpen, toggleDropdown, dropdownRef, onClose, onOpen } = useDropdown();
//     const currentLocale = i18n.language;

//     const handleLanguageChange = (locale: string) => {
//         const days = 30;
//         const date = new Date();
//         date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
//         const expires = date.toUTCString();
//         document.cookie = `NEXT_LOCALE=${locale};expires=${expires};path=/`;

//         const newPath =
//             currentLocale === i18nConfig.defaultLocale && !i18nConfig.prefixDefault
//                 ? `/${locale}${pathname}`
//                 : pathname.replace(`/${currentLocale}`, `/${locale}`);

//         router.push(newPath);
//         onClose();
//     };

//     return (
//         <div className="relative ml-5">
//             <button
//                 className="flex items-center text-sm text-gray-600 dark:bg-dark hover:bg-gray-100 px-3 py-2 rounded-lg"
//                 onClick={toggleDropdown}
//                 onMouseEnter={onOpen}
//             >
//                 {currentLocale === "en" ? (
//                     <Icon icon="flagpack:us" width="28" />
//                 ) : (
//                     <Icon icon="flagpack:vn" width="28" />
//                 )}
//                 <FaAngleDown className="ml-2" />
//             </button>
//             {isOpen && (
//                 <div
//                     ref={dropdownRef}
//                     className="absolute right-0 mt-2 w-fit bg-white dark:bg-dark border border-gray-200 dark:border-darker-950 rounded-lg shadow-md"
//                     onMouseLeave={onClose}
//                 >
//                     <ul className="p-2">
//                         <li>
//                             <button
//                                 onClick={() => handleLanguageChange("en")}
//                                 className="w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-dark"
//                             >
//                                 <Icon icon="flagpack:us" width="28" />
//                             </button>
//                         </li>
//                         <li>
//                             <button
//                                 onClick={() => handleLanguageChange("vi")}
//                                 className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-dark"
//                             >
//                                 <Icon icon="flagpack:vn" width="28" />
//                             </button>
//                         </li>
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// };
// export default LanguageDropdown;

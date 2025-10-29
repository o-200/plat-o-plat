import React from "react";
import { Separator } from "../shadcn/separator";
import { FooterProps } from ".";
import Image from "next/image";

export const FooterComponent: React.FC<FooterProps> = ({
    logoSrc = "/images/light-logo.svg",
    logoAlt = "Лого компании.",
    paymentCardsSrc = "/images/cards.svg",
    paymentCardsAlt = "Поддерживаемые методы оплаты.",
    companyLinks = [
        { label: "Лимиты по операциям", href: "" },
        { label: "Возврат денежных средств", href: "" },
    ],
    resourcesLinks = [
        { label: "Возврат билетов", href: "" },
    ],
    supportLinks = [
        { label: "Персональные данные", href: "" },
        { label: "Условия использования", href: "/terms" },
        { label: "Политика конфиденциальности", href: "/privacy" },
    ],
    socialMediaLinks = [
        { href: "tel:+73912755353", ariaLabel: "+7 (391) 275-53-53" },
        { href: "mailto:info@krasplat.ru", ariaLabel: "info@krasplat.ru" },
    ],
}) => {
    return (
        <footer className="bg-[#252525] text-gray-200 w-full py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[75%]">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 auto-rows-[minmax(min-content,auto)] overflow-hidden">
                    <div className="flex flex-col items-start">
                        {logoSrc && (
                            <Image
                                src={logoSrc}
                                alt={logoAlt}
                                className="mb-4 object-contain"
                                loading="lazy"
                                width={300}
                                height={10}
                            />
                        )}
                        {paymentCardsSrc && (
                            <Image
                                src={paymentCardsSrc}
                                alt={paymentCardsAlt}
                                width={300}
                                height={40}
                                loading="lazy"
                            />
                        )}
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-base font-semibold text-white mb-3">Операции</h3>
                        <ul className="space-y-1.5">
                            {companyLinks.slice(0, 4).map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-gray-300 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-base font-semibold text-white mb-3">Билеты</h3>
                        <ul className="space-y-1.5">
                            {resourcesLinks.slice(0, 4).map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-gray-300 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-base font-semibold text-white mb-3">Условия</h3>
                        <ul className="space-y-1.5">
                            {supportLinks.slice(0, 4).map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-gray-300 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-base font-semibold text-white mb-3">Контакты</h3>
                        <ul className="space-y-1.5">
                            {socialMediaLinks.slice(0, 4).map((link, index) => (
                                <li key={index}>
                                    <a
                                        key={index}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-300 hover:text-white transition-colors"
                                        aria-label={link.ariaLabel}
                                    >
                                        {link.icon}
                                        {link.ariaLabel}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <Separator className="my-6 bg-gray-500 opacity-70 h-px" />
                <div className="text-center text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} Платёжка Онлайн. Все права сохранены.
                </div>
            </div>
        </footer>
    );
};
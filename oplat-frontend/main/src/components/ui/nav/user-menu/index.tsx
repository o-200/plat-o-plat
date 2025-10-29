import React, { useState } from "react";
import { User } from "lucide-react";
import { ThemeSwitcher } from "../theme-button/index";
import { UserModal } from "../modal/"
import { cn } from "../../../../lib/utils"

interface UserMenuProps {
    showThemeSwitcher?: boolean;
    user?: {
        isLoggedIn: boolean;
        lastName?: string;
        firstName?: string;
        patronymic?: string;
    };
    onLogin?: (data: { phone: string; telegram: boolean; whatsapp: boolean }) => void;
    onRegister?: (data: { name: string; phone: string; telegram: boolean; whatsapp: boolean }) => void;
    classNameWrapper?: string;
}

export const UserMenu: React.FC<UserMenuProps> = ({
    showThemeSwitcher = false,
    user = { isLoggedIn: false },
    onLogin,
    onRegister,
    classNameWrapper,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const displayName = user.isLoggedIn && user.lastName && user.firstName
        ? `${user.lastName} ${user.firstName[0]}. ${user.patronymic ? user.patronymic[0] + "." : ""}`
        : "Личный кабинет";

    return (
        <div className={cn("flex items-center", classNameWrapper)}>
            <button
                onClick={() => setIsModalOpen(true)}
                className={cn(
                    "flex items-center gap-2 p-2 rounded-full",
                    "hover:bg-gray-200 dark:hover:bg-neutral-700",
                    "text-sm font-medium text-gray-800 dark:text-gray-200",
                    "max-w-[200px] truncate",
                    "[&>span]:hidden sm:[&>span]:block"
                )}
                aria-label={displayName}
            >
                <User className="w-5 h-5 flex-shrink-0" />
                <span className="truncate">{displayName}</span>
            </button>
            <UserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onLogin={onLogin}
                onRegister={onRegister}
                imageSrc="images/login.svg"
                imageAlt="Картинка для входа"
                defaultTab={user.isLoggedIn ? "profile" : "login"}
                user={user}
            />
            {showThemeSwitcher && (
                <ThemeSwitcher />
            )}
        </div>
    );
};
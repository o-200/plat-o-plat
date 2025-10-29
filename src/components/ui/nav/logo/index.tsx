"use client"

import Image from "next/image"
import { useTheme } from "next-themes"

export const Logo = () => {
    const { theme } = useTheme()
    const logoSrc = theme === "dark" ? "/images/light-logo.svg" : "/images/dark-logo.svg"

    return (
        <Image
            src={logoSrc}
            alt="Логотип"
            width={300}
            height={40}
            priority
        />
    )
}
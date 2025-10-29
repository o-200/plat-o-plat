"use client"
import { useEffect, useState } from "react"
import { NavbarDesktop } from "././desktop/index"
import { NavbarMobile } from "././mobile/index"

export const NavigationMenuApp = () => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768)
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return isMobile ? <NavbarMobile /> : <NavbarDesktop />
}
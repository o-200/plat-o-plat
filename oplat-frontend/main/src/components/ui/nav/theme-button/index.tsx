'use client'

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../shadcn/button";

export function ThemeSwitcher() {
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    if (!mounted) {
        return (
            <Button
                variant="ghost"
                size="icon"
                className="rounded-full opacity-0 mt-auto mb-auto"
                aria-label="Переключить тему"
            >
                <Sun className="h-5 w-5" />
            </Button>
        )
    }

    const isLight = resolvedTheme === "light"

    return (
        <Button
            variant="ghost"
            size="icon"
            aria-label="Переключить тему"
            onClick={() => setTheme(isLight ? "dark" : "light")}
            className="rounded-full hover:bg-muted transition mt-auto mb-auto"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={isLight ? "sun" : "moon"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {isLight ? (
                        <Moon className="h-5 w-5 text-gray-800" />
                    ) : (
                        <Sun className="h-5 w-5 text-yellow-400" />
                    )}
                </motion.div>
            </AnimatePresence>
        </Button>
    )
}
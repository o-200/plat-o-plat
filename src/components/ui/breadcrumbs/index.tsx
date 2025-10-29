"use client"

import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/shadcn/breadcrumb"

const SEGMENT_TITLES: Record<string, string> = {
    "services": "Страница с услугами",
    "1": "Услуга",
    "details": "Детали услуги",
    "payment": "Оплата",
    "": "Главная страница",
}

export function BreadcrumbsComponent() {
    const pathname = usePathname()
    const segments = pathname.split("/").filter(Boolean)

    let pathAccumulator = ""

    return (
        <Breadcrumb className="backdrop-blur-md bg-white/60 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 rounded-xl p-3 shadow-sm">
            <BreadcrumbList className="flex flex-wrap items-center gap-1 text-sm">
                {[""].concat(segments).map((segment, index) => {
                    const isLast = index === segments.length
                    pathAccumulator += segment ? `/${segment}` : "/"

                    const title = SEGMENT_TITLES[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)

                    return (
                        <span key={index} className="flex items-center">
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage className="font-medium text-primary">{title}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link href={pathAccumulator} className="hover:text-primary transition-colors">
                                            {title}
                                        </Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>

                            {!isLast && (
                                <BreadcrumbSeparator>
                                    <ChevronRight className="h-4 w-4 opacity-50" />
                                </BreadcrumbSeparator>
                            )}
                        </span>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

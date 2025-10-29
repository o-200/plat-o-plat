import React from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../shadcn/card"
import { CardComponentProps, CardContainerProps } from "./types"
import clsx from "clsx"
import { Separator } from "../shadcn/separator"
import { Button } from "../shadcn/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

export const CardComponent: React.FC<CardComponentProps> = ({
    title,
    content,
    firstService,
    secondService,
    thirdService,
    fourthService,
    width = "max-w-[360px]",
    variant = "basic",
    icon,
    buttonText,
    onButtonClick,
    href,
    headerHeight,
}) => {
    const services = [firstService, secondService, thirdService, fourthService].filter(Boolean)

    const variantClasses = {
        basic: `
      bg-[#EDF5F2] dark:bg-[#12443A]
      hover:shadow-lg transition-all
    `,
        gradient: `
      bg-[linear-gradient(132.13deg,#EDF5F2_2.51%,#9AC9B8_98.17%)]
      dark:bg-[linear-gradient(125.13deg,#12443A_0%,#29685B_100%)]
      hover:shadow-xl transition-all
    `,
        highlight: `
      bg-[#FFF8CC] dark:bg-[#3B3B3B]
      dark:shadow-[4px_4px_15px_0px_#FFDD0033]
      hover:bg-white dark:hover:bg-[#444]
      transition-all duration-0
    `,
    }

    const CardInner = (
        <Card
            className={cn(
                "flex flex-col justify-between relative cursor-pointer",
                "rounded-2xl shadow-md p-3 sm:p-5 text-left flex-shrink-0 snap-center",
                "hover:scale-[1.01] transition-transform",
                width,
                variantClasses[variant],
                "overflow-visible"
            )}
        >
            <CardHeader
                className={cn(
                    "flex justify-between items-start mb-2",
                    "min-h-[4rem]",
                    "flex items-center"
                )}
            >
                <CardTitle className="text-balance text-2xl font-extrabold">
                    {title}
                </CardTitle>
                {icon && (
                    <div className="ml-2 text-gray-500 dark:text-gray-300 flex-shrink-0">
                        {icon}
                    </div>
                )}
            </CardHeader>
            <Separator className="opacity-70 my-2 bg-gray-500 dark:bg-gray-300 h-px relative z-10" />
            <CardContent className="flex-grow min-h-0">
                {content && <p className="text-gray-600 mb-2 dark:text-gray-300">{content}</p>}
                {services.map((service, i) => (
                    <p key={i} className="text-sm text-gray-700 dark:text-gray-200 mb-1">
                        {service}
                    </p>
                ))}
            </CardContent>
            {buttonText && (
                <CardFooter className="pt-4 mt-auto">
                    <Button
                        className="pt-6 pr-7 pb-6 pl-7 text-black bg-yellow-400 font-bold hover:bg-yellow-500 cursor-pointer"
                        onClick={onButtonClick}
                    >
                        {buttonText}
                    </Button>
                </CardFooter>
            )}
        </Card>
    )

    return href ? (
        <Link href={href} className="no-underline">
            {CardInner}
        </Link>
    ) : (
        CardInner
    )
}

export const CardContainer: React.FC<CardContainerProps> = ({
    children,
    rows,
    smCols,
    maxWidth = "1200px",
    gap = "1.5rem",
}) => {
    const totalCards = React.Children.count(children)
    const cols = rows ? Math.ceil(totalCards / rows) : undefined
    const smColsAuto = smCols ?? (cols ? Math.min(cols, 2) : undefined)

    const gridClass = clsx(
        "grid grid-cols-1 items-stretch",
        {
            "sm:grid-cols-2": smColsAuto === 2,
            "sm:grid-cols-3": smColsAuto === 3,
        },
        {
            "lg:grid-cols-2": cols === 2,
            "lg:grid-cols-3": cols === 3,
        },
        // Ensure all cards in a row have the same height
        "auto-rows-[minmax(min-content,auto)]",
        // Add align-content to ensure rows are properly spaced
        "align-content-start",
        "w-full md:grid md:justify-items-center overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none scroll-smooth",
        {
            "max-w-4xl": maxWidth === "1100px",
            "max-w-5xl": maxWidth === "1280px",
        },
        {
            "gap-6": gap === "1.5rem",
            "gap-4": gap === "1rem",
        }
    )

    return (
        <div className="flex justify-center items-center w-full px-5 py-10">
            <div className={gridClass}>{children}</div>
        </div>
    )
}
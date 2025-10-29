"use client"

import React, { useState, useEffect, useCallback, useMemo } from "react"
import { Search as SearchIcon, Loader2, X } from "lucide-react"
import { cn } from "@/lib/utils"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/shadcn/command"
import { useRouter } from "next/navigation"
import Fuse from "fuse.js"
import { useDebounce } from "use-debounce"

const operators = [
    { id: 1, name: "МТС", slug: "/operators/mts", type: "operator" },
    { id: 2, name: "Билайн", slug: "/operators/beeline", type: "operator" },
    { id: 3, name: "Мегафон", slug: "/operators/megafon", type: "operator" },
    { id: 4, name: "Tele2", slug: "/operators/tele2", type: "operator" },
]

const sites = [
    { id: 101, name: "Google", slug: "/sites/google", type: "site" },
    { id: 102, name: "Yandex", slug: "/sites/yandex", type: "site" },
    { id: 103, name: "VK", slug: "/sites/vk", type: "site" },
]

const allData = [...operators, ...sites]

interface SearchComponentProps {
    className?: string
    placeholder?: string
    operatorsData?: typeof operators
    sitesData?: typeof sites
    onSelect?: (item: any) => void
    debounceDelay?: number
}

export const SearchComponent: React.FC<SearchComponentProps> = ({
    className,
    placeholder = "Поиск по операторам и сайтам...",
    operatorsData = operators,
    sitesData = sites,
    onSelect,
    debounceDelay = 300,
}) => {
    const [query, setQuery] = useState("")
    const [debouncedQuery] = useDebounce(query, debounceDelay)
    const [results, setResults] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const fuse = useMemo(
        () => new Fuse([...operatorsData, ...sitesData], {
            keys: ["name"],
            threshold: 0.3,
            includeScore: true,
        }),
        [operatorsData, sitesData]
    )

    useEffect(() => {
        if (debouncedQuery.trim()) {
            setLoading(true)
            const timer = setTimeout(() => {
                const fuseResults = fuse.search(debouncedQuery).map((res) => res.item)
                setResults(fuseResults)
                setLoading(false)
            }, 200)

            return () => clearTimeout(timer)
        } else {
            setResults([])
            setLoading(false)
        }
    }, [debouncedQuery, fuse])

    const handleSelect = useCallback(
        (item: any) => {
            setQuery("")
            setResults([])
            if (onSelect) {
                onSelect(item)
            } else {
                router.push(item.slug)
            }
        },
        [onSelect, router]
    )

    const operatorResults = results.filter((item) => item.type === "operator")
    const siteResults = results.filter((item) => item.type === "site")
    const hasResults = operatorResults.length > 0 || siteResults.length > 0

    return (
        <div className={cn("relative w-full", className)}>
            <Command className="w-full bg-background border rounded-md shadow-sm">
                <div className="flex items-center border-b px-3">
                    <SearchIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    <input
                        placeholder={placeholder}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-1 outline-none py-2 text-sm placeholder:text-muted-foreground bg-transparent"
                    />
                    {query && (
                        <button onClick={() => setQuery("")} className="ml-auto">
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>
                <CommandList className="max-h-[300px] overflow-auto">
                    {loading && (
                        <CommandEmpty>
                            <div className="flex items-center justify-center py-6">
                                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                                <span className="ml-2 text-sm text-muted-foreground">Поиск...</span>
                            </div>
                        </CommandEmpty>
                    )}
                    {!loading && debouncedQuery.trim() && !hasResults && (
                        <CommandEmpty>
                            <div className="py-6 text-center text-sm text-muted-foreground">
                                Ничего не найдено по запросу "{debouncedQuery}".<br />
                                <span className="text-xs">Попробуйте другой запрос или проверьте орфографию.</span>
                            </div>
                        </CommandEmpty>
                    )}
                    {!loading && hasResults && (
                        <>
                            {operatorResults.length > 0 && (
                                <CommandGroup heading="Операторы">
                                    {operatorResults.map((item) => (
                                        <CommandItem
                                            key={item.id}
                                            onSelect={() => handleSelect(item)}
                                            className="cursor-pointer"
                                        >
                                            {item.name} (Оператор)
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            )}
                            {siteResults.length > 0 && (
                                <CommandGroup heading="Сайты">
                                    {siteResults.map((item) => (
                                        <CommandItem
                                            key={item.id}
                                            onSelect={() => handleSelect(item)}
                                            className="cursor-pointer"
                                        >
                                            {item.name} (Сайт)
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            )}
                        </>
                    )}
                    {!debouncedQuery.trim() && !loading && (
                        <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
                            Начните вводить для поиска...
                        </CommandEmpty>
                    )}
                    
                </CommandList>
            </Command>
        </div>
    )
}
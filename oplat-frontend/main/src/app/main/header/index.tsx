import { Button } from "@/components/ui"

export const HeaderComponent = () => {
    return (
        <div className="container mx-auto px-4 pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-48 lg:pb-24">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 md:mb-8 uppercase break-keep w-full md:w-[70%] lg:w-[55%] leading-tight">
                20 лет помогаем оплачивать услуги
            </h1>
            <Button className="py-4 px-6 md:py-6 md:px-8 bg-yellow-300 text-black font-bold hover:bg-yellow-400 text-sm md:text-base">
                Связаться с нами
            </Button>
        </div>
    )
}
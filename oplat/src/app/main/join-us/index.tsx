'use client'

import { FormComponent, joinUsFields } from "@/components/ui"

export const JoinUsComponent = () => {

    const handleFormSubmit = (data: any) => {
        console.log('Информация из формы', data)
    }

    return (
        <div className="w-1/2">
            <h1 className="text-6xl uppercase font-bold mb-4">Оставьте заявку на подключение</h1>
            <FormComponent
                fields={joinUsFields}
                handleSubmit={handleFormSubmit}
                submitButtonText={"Отправить"} />
        </div>
    )
}
import React from "react";
import { FormComponent, FormFieldProps } from "@/components/ui/form/index";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface RegisterComponentProps {
    onSubmit?: (data: { name: string; phone: string; deliveryMethod: string }) => void;
    onClose: () => void;
}

const formSchema = z.object({
    name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
    phone: z
        .string()
        .regex(/^\+7 \d{3} \d{3}-\d{2}-\d{2}$/, "Номер телефона указан неверно"),
    deliveryMethod: z.enum(["telegram", "whatsapp"], {
        errorMap: () => ({ message: "Выберите способ получения кода" }),
    }),
});

type FormData = z.infer<typeof formSchema>;

const RegisterComponent: React.FC<RegisterComponentProps> = ({ onSubmit, onClose }) => {
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            phone: "",
            deliveryMethod: undefined,
        },
    });

    const handleSubmit = (data: FormData) => {
        if (onSubmit) {
            onSubmit(data);
        }
        onClose();
    };

    const deliveryOptions = [
        { value: "telegram", label: "Telegram" },
        { value: "whatsapp", label: "WhatsApp" },
        { value: "max", label: "Max" },
    ];

    const fields: FormFieldProps[] = [
        {
            name: "phone",
            label: "Номер телефона",
            type: "tel",
            placeholder: "+7 (___) ___-__-__",
            mask: "+7 (000) 000-00-00",
            className: "w-full max-w-md ",
        },
        {
            name: "email",
            label: "Email",
            type: "text",
            placeholder: "who@mail.ru",
            className: "w-full max-w-md",
        },
        {
            name: "whatsapp",
            label: "WhatsApp аккаунт",
            type: "text",
            placeholder: "+79999999999",
            className: "w-full max-w-md",
        },
        {
            name: "telegram",
            label: "Telegram аккаунт",
            type: "text",
            placeholder: "sobakoed",
            className: "w-full max-w-md",
        },
        {
            name: "lastName",
            label: "Фамилия",
            type: "text",
            placeholder: "Иванов",
            className: "w-full max-w-md",
        },
        {
            name: "firstName",
            label: "Имя",
            type: "text",
            placeholder: "Иван",
            className: "w-full max-w-md",
        },
        {
            name: "patronymic",
            label: "Отчество",
            type: "text",
            placeholder: "Иванович",
            className: "w-full max-w-md",
        },
        {
            name: "deliveryMethod",
            label: "Способ получения кода",
            type: "radio",
            options: deliveryOptions,
            className: "space-y-1",
        },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold text-center md:text-left">Регистрация</h1>
            <FormComponent
                fields={fields}
                onSubmit={form.handleSubmit(handleSubmit)}
                submitButtonText="Зарегистрироваться"
                className="space-y-2 w-full max-w-md mx-auto"
            />
        </div>
    );
};

export default RegisterComponent;
import React from "react";
import { FormComponent, FormFieldProps } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface LoginComponentProps {
    onSubmit?: (data: { phone: string; deliveryMethod: string }) => void;
    onClose: () => void;
}

const formSchema = z.object({
    phone: z
        .string()
        .regex(/^\+7 \d{3} \d{3}-\d{2}-\d{2}$/, "Номер телефона указан неверно"),
    deliveryMethod: z.enum(["telegram", "whatsapp"], {
        errorMap: () => ({ message: "Выберите способ получения кода" }),
    }),
});

type FormData = z.infer<typeof formSchema>;

const LoginComponent: React.FC<LoginComponentProps> = ({ onSubmit, onClose }) => {
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
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
            <h1 className="text-3xl font-bold text-center md:text-left">Вход в аккаунт</h1>
            <FormComponent
                fields={fields}
                onSubmit={form.handleSubmit(handleSubmit)}
                submitButtonText="Получить код"
                className="space-y-8 w-full max-w-md mx-auto"
            />
        </div>
    );
};

export default LoginComponent;
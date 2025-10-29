'use client';

import { useState } from 'react';
import { Button } from '../shadcn/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../shadcn/dialog';
import { FormComponent } from '../form/index';
import { contactFields } from '../fields';

export const ContactUs: React.FC = () => {
    const [serverError, setServerError] = useState<string | null>(null);

    const handleSubmit = async (data: any) => {
        try {
            console.log('Contact Form Data:', data);
            setServerError(null);
            document.getElementById('close-dialog')?.click();
        } catch (error) {
            setServerError('Не удалось отправить сообщение');
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="default"
                    className="
                    fixed right-[2px] top-1/4 -translate-y-1/2
                    rotate-90 origin-right-top
                    z-50 font-bold
                    rounded-t-none rounded-b-2xl border-1 border-white
                    bg-yellow-300 border shadow-md text-black
                    hover:bg-accent hover:text-accent-foreground hover:bg-yellow-400
                    transition-all
                    md:block hidden
                    "
                    style={{
                        right: `calc(env(scrollbar-width, 4.5rem) * -1)`,
                    }}
                >
                    Сообщить об ошибке
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Сообщить об ошибке на сайте</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                    <FormComponent
                        fields={contactFields}
                        onSubmit={handleSubmit}
                        submitButtonText="Отправить"
                        className="space-y-4"
                    />
                    {serverError && <p className="text-red-500 text-sm">{serverError}</p>}
                </div>
                <DialogFooter className="sm:justify-center">
                    <DialogClose asChild>
                        <Button id="close-dialog" type="button" variant="secondary" className="hidden">
                            Закрыть
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
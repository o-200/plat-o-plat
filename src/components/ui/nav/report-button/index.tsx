// report-button (обновленный: убрал лишние стили, добавил flex для иконки и self-center через className)
"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/shadcn/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/shadcn/dialog"  // Убрал ненужные импорты (DialogFooter, DialogClose)
import { FormComponent } from "../../form/index"
import { cn } from "@/lib/utils"
import { contactFields } from "../.."
import { AlertCircle } from "lucide-react"

interface ReportButtonProps {
    className?: string
    buttonText?: string
    submitButtonText?: string
    onSubmit?: (data: any) => Promise<void> | void
}

export const ReportButton: React.FC<ReportButtonProps> = ({
    className,
    buttonText = "Нашли ошибку?",
    submitButtonText = "Отправить",
    onSubmit,
}) => {
    const [open, setOpen] = useState(false)
    const [serverError, setServerError] = useState<string | null>(null)

    const handleSubmitInternal = async (data: any) => {
        try {
            setServerError(null)
            if (onSubmit) {
                await onSubmit(data)
            } else {
                console.log("Report form data:", data)
            }
            setOpen(false)
        } catch (err) {
            setServerError("Не удалось отправить сообщение")
        }
    }

    return (
        <>
            <Button
                variant="ghost"
                className={cn("p-2 self-center", className)}
                onClick={() => setOpen(true)}
                aria-label={buttonText}
            >
                <AlertCircle className="h-5 w-5 text-red-500" />
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <AlertCircle className="h-5 w-5 text-red-500" />
                            Сообщить об ошибке на сайте
                        </DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4">
                        <FormComponent
                            fields={contactFields}
                            onSubmit={handleSubmitInternal}
                            submitButtonText={submitButtonText}
                            className="space-y-4"
                        />
                        {serverError && <p className="text-red-500 text-sm">{serverError}</p>}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
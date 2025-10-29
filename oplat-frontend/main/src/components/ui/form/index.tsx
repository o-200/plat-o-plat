'use client'

import { useForm, Controller } from 'react-hook-form';
import { Button } from "../shadcn/button";
import { Input } from '../shadcn/input';
import { Textarea } from '../shadcn/textarea';
import { Checkbox } from '../shadcn/checkbox';
import { RadioGroup, RadioGroupItem } from '../shadcn/radio-group';
import { Form as FormWrapper, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../shadcn/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from "../../../lib/utils";
import { IMaskInput } from 'react-imask';
import { FormProps } from '.';

export const FormComponent = ({ fields, onSubmit, submitButtonText = 'Submit', className, children }: FormProps) => {
    const schema = z.object(
        fields.reduce((acc, field) => {
            if (field.type === 'tel') {
                acc[field.name] = field.validation || z.string()
                    .regex(/^\+7 \d{3} \d{3}-\d{2}-\d{2}$/, 'Номер телефона указан неверно');
            } else if (field.type === 'checkbox') {
                acc[field.name] = field.validation || z.boolean().optional();
            } else if (field.type === 'radio') {
                acc[field.name] = field.validation || z.string().min(1, `${field.label} обязателен`);
            } else {
                acc[field.name] = field.validation || z.string().min(1, `${field.label} обязательно`);
            }
            return acc;
        }, {} as Record<string, z.ZodType<any>>)
    );

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: fields.reduce((acc, field) => {
            acc[field.name] = field.type === 'checkbox' ? false : (field.type === 'radio' ? '' : (field.defaultValue || ''));
            return acc;
        }, {} as Record<string, string | number | boolean>),
    });

    const getSizeClasses = (size: string | undefined) => {
        switch (size) {
            case 'sm': return 'px-2 py-1 text-sm h-8';
            case 'lg': return 'px-6 py-4 text-lg h-12';
            case 'xl': return 'px-8 py-6 text-xl h-16';
            default: return 'px-4 py-3 text-base h-10';
        }
    };

    const baseInputStyles = cn(
        'w-full rounded-md border border-input bg-background transition',
        'placeholder:text-muted-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50'
    );

    const groupFieldsById = (fields: typeof fields) => {
        const groups: Record<string, typeof fields> = {};
        fields.forEach(field => {
            const key = field.groupId || `single_${field.name}`;
            if (!groups[key]) groups[key] = [];
            groups[key].push(field);
        });
        return groups;
    };

    const groupedFields = groupFieldsById(fields);

    const renderFieldContent = (field: typeof fields[0], formField: any, error: any) => {
        const inputStyles = cn(baseInputStyles, getSizeClasses(field.size), field.className);
        const errorStyles = error ? 'border-red-500 focus-visible:ring-red-500' : '';

        if (field.type === 'select') {
            return (
                <select
                    {...formField}
                    className={cn(inputStyles, errorStyles)}
                >
                    {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            );
        } else if (field.type === 'textarea') {
            return (
                <Textarea
                    {...formField}
                    placeholder={field.placeholder}
                    className={cn(inputStyles, errorStyles, 'min-h-[100px] resize-none')}
                />
            );
        } else if (field.type === 'tel') {
            return (
                <Controller
                    control={form.control}
                    name={field.name}
                    render={({ field: controllerField }) => (
                        <IMaskInput
                            mask={field.mask || '+7 (000) 000-00-00'}
                            value={controllerField.value || ''}
                            onAccept={(value) => controllerField.onChange(value)}
                            placeholder={field.placeholder}
                            className={cn("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", inputStyles, errorStyles)}
                        />
                    )}
                />
            );
        } else if (field.type === 'checkbox') {
            return (
                <div className="flex items-center space-x-2">
                    <Checkbox
                        checked={formField.value}
                        onCheckedChange={formField.onChange}
                        className={cn(errorStyles)}
                    />
                    <span className="text-base">{field.label}</span>
                </div>
            );
        } else if (field.type === 'radio') {
            return (
                <RadioGroup
                    onValueChange={formField.onChange}
                    value={formField.value}
                    className={cn('flex flex-col space-y-4')}
                >
                    {field.options?.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                            <RadioGroupItem value={option.value} id={option.value} />
                            <label htmlFor={option.value} className="text-base cursor-pointer">
                                {option.label}
                            </label>
                        </div>
                    ))}
                </RadioGroup>
            );
        } else {
            return (
                <Input
                    type={field.type || 'text'}
                    placeholder={field.placeholder}
                    {...formField}
                    className={cn(inputStyles, errorStyles)}
                />
            );
        }
    };

    const renderSingleField = (field: typeof fields[0]) => (
        <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField, fieldState: { error } }) => (
                <FormItem className="space-y-2">
                    {field.type !== 'checkbox' && <FormLabel className="text-base">{field.label}</FormLabel>}
                    <FormControl>
                        {renderFieldContent(field, formField, error)}
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                </FormItem>
            )}
        />
    );

    const renderGroups = Object.entries(groupedFields).map(([groupId, groupFields]) => {
        if (groupId.startsWith('single_')) {
            return groupFields.map(renderSingleField);
        }

        let totalCols = groupFields.reduce((sum, f) => sum + (f.colSpan || 1), 0);
        if (totalCols < 1 || totalCols > 12) totalCols = Math.min(groupFields.length * 2, 12);
        if (totalCols === 0) totalCols = 2;

        const gridColsClass = `grid-cols-${totalCols}`;
        const responsiveClass = cn('grid gap-4', 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2');

        return (
            <div
                key={groupId}
                className={cn(
                    'grid gap-4 w-full',
                    'grid-cols-1',
                    `md:grid-cols-${totalCols}`,
                    'items-start'
                )}
            >
                {groupFields.map((field) => (
                    <div
                        key={field.name}
                        className={cn(
                            `col-span-1`,
                            `md:col-span-${field.colSpan || 1}`,
                            'flex flex-col space-y-2 w-full'
                        )}
                    >
                        {renderSingleField(field)}
                    </div>
                ))}
            </div>
        );
    });

    return (
        <FormWrapper {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={cn('space-y-6 w-full', className)}>
                {renderGroups}
                {children}
                <Button type="submit" className="w-full font-bold text-black text-base py-6 bg-yellow-400 hover:bg-yellow-500 cursor-pointer">
                    {submitButtonText}
                </Button>
            </form>
        </FormWrapper>
    );
};
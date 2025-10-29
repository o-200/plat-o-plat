import { CardComponent, CardContainer } from '@/components/ui';
import { ProductsText } from './text';

export const ProductsComponent = () => {
    return (
        <div>
            <h1 className='text-2xl font-bold mb-4'>Продукты</h1>
            <CardContainer rows={2}>
                {ProductsText.map(({ id, header, content }) => (
                    <CardComponent
                        key={id}
                        title={header}
                        content={content}
                        width='w-full'
                        buttonText='Перейти в раздел'
                        variant='gradient'
                    />
                ))}
            </CardContainer>
        </div>
    )
}
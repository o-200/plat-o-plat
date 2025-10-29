import { CardComponent, CardContainer } from '@/components/ui';
import { DocumentsText } from './text';

export const DocumentsComponent = () => {
    return (
        <div>
            <h1 className='text-2xl font-bold mb-4'>Отрасли</h1>
            <CardContainer rows={2}>
                {DocumentsText.map(({ id, header, content }) => (
                    <CardComponent
                        key={id}
                        title={header}
                        content={content}
                        width='w-full'
                        buttonText='Перейти в раздел'
                        variant="highlight"
                    />
                ))}
            </CardContainer>
        </div>
    )
}
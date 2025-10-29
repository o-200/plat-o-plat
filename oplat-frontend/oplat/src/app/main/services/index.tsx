import { CardComponent, CardContainer } from "@/components/ui"
import { ServicesText } from "./text"

export const ServicesComponent = async () => {
    return (
        <div>
            <CardContainer rows={2} gap="1rem">
                {ServicesText.map(
                    ({
                        id,
                        header,
                        firstService,
                        secondService,
                        thirdService,
                        fourthService,
                    }) => (
                        <CardComponent
                            key={id}
                            title={header}
                            firstService={firstService}
                            secondService={secondService}
                            thirdService={thirdService}
                            fourthService={fourthService}
                            width="w-full"
                        />
                    )
                )}
            </CardContainer>
        </div>
    )
}

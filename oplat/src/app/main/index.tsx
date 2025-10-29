import { DocumentsComponent } from "./documents";
import { HeaderComponent } from "./header";
import { JoinUsComponent } from "./join-us";
import { ProductsComponent } from "./products";
import { SearchComponentMain } from "./search";
import { ServicesComponent } from "./services";

export default function MainPage({ }) {
    return (
        <div className="container mx-auto md:p-8">
            <HeaderComponent />
            <SearchComponentMain />
            <ServicesComponent />
            <ProductsComponent />
            <DocumentsComponent />
            <JoinUsComponent />
        </div>
    )
}
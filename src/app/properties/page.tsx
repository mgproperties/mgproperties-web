import { Navbar } from "@/components/layout/navbar";
import { PropertiesHero } from "@/components/properties/properties-hero";
import { PropertiesFilters } from "@/components/properties/properties-filters";
import { PropertiesGrid } from "@/components/properties/properties-grid";
import { Footer } from "@/components/layout/footer";

export default function PropertiesPage() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <PropertiesHero />
            <PropertiesFilters />
            <PropertiesGrid />
            <Footer />
        </div>
    );
}

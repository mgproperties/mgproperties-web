"use client"

import { Navbar } from "@/components/layout/navbar";
import { PropertiesHero } from "@/components/properties/properties-hero";
import { PropertiesFilters } from "@/components/properties/properties-filters";
import { PropertiesGrid } from "@/components/properties/properties-grid";
import { Footer } from "@/components/layout/footer";
import { useEffect, useState } from 'react';
import { FilterContext, FilterState, PropertyData } from "@/contexts/FilterContext";
import { usePropertiesContext } from "@/contexts/PropertiesContext";


export default function PropertiesPage() {

    const { allProperties, fetchProperties, loading } = usePropertiesContext();

    const [filters, setFilters] = useState<FilterState>({
        features: [],
        propertyAge: '',
        minSqFt: '',
        maxSqFt: '',
        listingStatus: [],
        sortBy: 'newest'
    });

    
    useEffect(() => {
        fetchProperties();
    }, [fetchProperties]);
    return (
        <FilterContext.Provider value={{ 
                filters, 
                setFilters, 
                properties: allProperties, 
                setProperties: () => {},
                loading 
            }}>
            <div className="min-h-screen">
                <Navbar />
                <PropertiesHero />
                <PropertiesFilters />
                <PropertiesGrid />
                <Footer />
            </div>
        </FilterContext.Provider>
    );
}

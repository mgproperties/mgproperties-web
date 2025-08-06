"use client"

import { Navbar } from "@/components/layout/navbar";
import { PropertiesHero } from "@/components/properties/properties-hero";
import { PropertiesFilters } from "@/components/properties/properties-filters";
import { PropertiesGrid } from "@/components/properties/properties-grid";
import { Footer } from "@/components/layout/footer";
import { useEffect, useState } from 'react';
import { FilterContext, FilterState, PropertyData } from "@/contexts/FilterContext";


function calculateDays(timestamp: string): number {
    const inputDate = new Date(timestamp);
    const today = new Date();
    const utcInput = Date.UTC(inputDate.getUTCFullYear(), inputDate.getUTCMonth(), inputDate.getUTCDate());
    const utcToday = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    return Math.floor((utcToday - utcInput) / millisecondsPerDay) + 1;
}

export default function PropertiesPage() {

    const [properties, setProperties] = useState<PropertyData[]>([]);
    const [filters, setFilters] = useState<FilterState>({
        features: [],
        propertyAge: '',
        minSqFt: '',
        maxSqFt: '',
        listingStatus: [],
        sortBy: 'newest'
    });

    const fetchProperties = async () => {
        try {
            const response = await fetch('api/properties', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const result: PropertyData[] = await response.json();

            if (response.ok) {
                const updatedProperties = result.map((property) => ({
                    ...property,
                    daysOnMarket: calculateDays(property.listedOn)
                }));
                setProperties(updatedProperties);
            }
        } catch (error) {
            console.error("Error fetching properties: ", error);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);
    return (
        <FilterContext.Provider value={{ filters, setFilters, properties, setProperties }}>
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

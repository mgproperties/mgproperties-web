import { createContext, useContext } from "react";

export interface PropertyData {
    propertyID: number;
    title: string;
    price: string;
    originalPrice?: string;
    location: string;
    beds: number;
    baths: number;
    sqm: number;
    images: string[];
    imageCount: number;
    status: string;
    featured: boolean;
    listedOn: string;
    propertyType?: string;
    daysOnMarket?: number;
    priceReduced: boolean;
    features: string[];
    description: string;
    openHouse?: string;
    agent?: {
        id: string;
        name: string;
        phone: string;
        email: string;
        image: string;
        role: string;
    } | null;
    agent_id: string;
}

export interface FilterState {
    features: string[];
    propertyAge: string;
    minSqFt: string;
    maxSqFt: string;
    listingStatus: string[];
    sortBy: string;
    // for search
    location: string;
    propertyType: string;
    priceRange: string;
    bedrooms: string;
}

interface FilterContextType {
    filters: FilterState;
    setFilters: (filters: FilterState) => void;
    properties: PropertyData[];
    setProperties: (properties: PropertyData[]) => void;
    loading?: boolean;
}

export const FilterContext = createContext<FilterContextType | undefined>(
    undefined
);

export const useFilterContext = () => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error(
            "useFilterContext must be used within a FilterProvider"
        );
    }
    return context;
};

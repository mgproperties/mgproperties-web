"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface PropertyImageCarouselProps {
    images: string[];
    title: string;
}

export function PropertyImageCarousel({
    images,
    title,
}: PropertyImageCarouselProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex(
            (prev) => (prev - 1 + images.length) % images.length
        );
    };

    if (!images || images.length === 0) {
        return (
            <div className="w-full h-[500px] bg-gray-200 flex items-center justify-center rounded-3xl shadow-lg">
                <span className="text-gray-500">No images available</span>
            </div>
        );
    }

    return (
        <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
            {/* Main Image */}
            <div className="aspect-video md:aspect-[16/9] lg:aspect-[21/9] w-full">
                <Image
                    src={images[currentImageIndex] || "/placeholder.svg"}
                    alt={`${title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, 100vw"
                    priority={currentImageIndex === 0}
                />
            </div>

            {/* Navigation Buttons */}
            {images.length > 1 && (
                <>
                    <Button
                        onClick={prevImage}
                        variant="ghost"
                        size="icon"
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full backdrop-blur-sm"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button
                        onClick={nextImage}
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full backdrop-blur-sm"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </Button>
                </>
            )}

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                                index === currentImageIndex
                                    ? "border-primary shadow-md"
                                    : "border-transparent hover:border-gray-300"
                            }`}
                        >
                            <img
                                src={image || "/placeholder.svg"}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

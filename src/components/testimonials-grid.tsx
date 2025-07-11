"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Star,
    Quote,
    MapPin,
    Calendar,
    Home,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

const testimonials = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "First-time Homebuyer",
        content:
            "PrimeRealty made my dream of homeownership a reality. Their team was incredibly patient and guided me through every step of the process with expertise and care.",
        rating: 5,
        image: "/placeholder.svg?height=80&width=80",
        property: "3BR Ranch in Maple Heights",
        location: "Maple Heights, OH",
        date: "December 2024",
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Property Investor",
        content:
            "I've worked with many real estate agencies, but PrimeRealty stands out for their market knowledge and professional service. They consistently deliver exceptional results.",
        rating: 5,
        image: "/placeholder.svg?height=80&width=80",
        property: "Duplex Investment Property",
        location: "Downtown District",
        date: "November 2024",
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        role: "Family Relocating",
        content:
            "Moving across states was stressful, but PrimeRealty's team made it seamless. They found us the perfect family home within our budget and timeline.",
        rating: 5,
        image: "/placeholder.svg?height=80&width=80",
        property: "4BR Colonial",
        location: "Family Friendly Suburbs",
        date: "October 2024",
    },
    {
        id: 4,
        name: "David Thompson",
        role: "Luxury Home Buyer",
        content:
            "The level of service and expertise PrimeRealty provided for our luxury home purchase was outstanding. They understood our specific needs and delivered beyond our expectations.",
        rating: 5,
        image: "/placeholder.svg?height=80&width=80",
        property: "5BR Executive Estate",
        location: "Westfield Estates",
        date: "September 2024",
    },
    {
        id: 5,
        name: "Lisa Park",
        role: "Downsizing Retiree",
        content:
            "After 30 years in our family home, downsizing felt overwhelming. PrimeRealty's compassionate approach and market expertise made the transition smooth and stress-free.",
        rating: 5,
        image: "/placeholder.svg?height=80&width=80",
        property: "2BR Luxury Condo",
        location: "Senior Living Community",
        date: "August 2024",
    },
    {
        id: 6,
        name: "James Wilson",
        role: "Commercial Investor",
        content:
            "PrimeRealty's commercial division helped me acquire three properties in prime locations. Their market analysis and negotiation skills saved me significant money.",
        rating: 5,
        image: "/placeholder.svg?height=80&width=80",
        property: "Commercial Properties",
        location: "Business District",
        date: "July 2024",
    },
    {
        id: 7,
        name: "Amanda Foster",
        role: "Young Professional",
        content:
            "As a first-time buyer in an expensive market, I was intimidated by the process. PrimeRealty's team educated me every step of the way and helped me find an amazing condo within my budget.",
        rating: 5,
        image: "/placeholder.svg?height=80&width=80",
        property: "Urban Condo",
        location: "Tech Corridor",
        date: "June 2024",
    },
    {
        id: 8,
        name: "Robert Martinez",
        role: "Property Developer",
        content:
            "Working with PrimeRealty on multiple development projects has been exceptional. Their market insights and professional network have been invaluable to our success.",
        rating: 5,
        image: "/placeholder.svg?height=80&width=80",
        property: "Development Projects",
        location: "Growth District",
        date: "May 2024",
    },
    {
        id: 9,
        name: "Jennifer Lee",
        role: "Military Family",
        content:
            "With frequent relocations due to military service, we've worked with many realtors. PrimeRealty's understanding of military families and their unique needs made our latest move the smoothest yet.",
        rating: 5,
        image: "/placeholder.svg?height=80&width=80",
        property: "Military Housing",
        location: "Base Community",
        date: "April 2024",
    },
];

export function TestimonialsGrid() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const testimonialsPerPage = 3;

    const nextSlide = () => {
        setCurrentIndex(
            (prev) => (prev + testimonialsPerPage) % testimonials.length
        );
    };

    const prevSlide = () => {
        setCurrentIndex(
            (prev) =>
                (prev - testimonialsPerPage + testimonials.length) %
                testimonials.length
        );
    };

    const currentTestimonials = testimonials.slice(
        currentIndex,
        currentIndex + testimonialsPerPage
    );
    if (currentTestimonials.length < testimonialsPerPage) {
        currentTestimonials.push(
            ...testimonials.slice(
                0,
                testimonialsPerPage - currentTestimonials.length
            )
        );
    }

    return (
        <section className="pt-24 pb-6 bg-gradient-to-b from-green-50/30 to-slate-50 relative overflow-hidden">
            {/* Warm background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-32 left-20 w-72 h-72 bg-gradient-to-br from-accent/8 to-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-16 w-96 h-96 bg-gradient-to-tr from-primary/5 to-accent/8 rounded-full blur-2xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Editorial Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20 rounded-full text-accent font-semibold mb-8">
                        Written Testimonials
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 text-slate-800 leading-tight">
                        What Our Clients
                        <span className="block bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                            Say About Us
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-accent to-primary mx-auto mb-8" />
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        Real stories from real clients who found their perfect
                        homes with our expert guidance and personalized service
                    </p>
                </div>

                {/* Carousel Container */}
                <div className="relative">
                    {/* Navigation Buttons */}
                    <Button
                        onClick={prevSlide}
                        variant="outline"
                        size="icon"
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white/90 hover:bg-white border-2 border-gray-200 hover:border-primary rounded-full shadow-lg hover:shadow-xl transition-all"
                    >
                        <ChevronLeft className="h-6 w-6 text-primary" />
                    </Button>

                    <Button
                        onClick={nextSlide}
                        variant="outline"
                        size="icon"
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white/90 hover:bg-white border-2 border-gray-200 hover:border-primary rounded-full shadow-lg hover:shadow-xl transition-all"
                    >
                        <ChevronRight className="h-6 w-6 text-primary" />
                    </Button>

                    {/* Testimonials Carousel */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500">
                        {currentTestimonials.map((testimonial, index) => (
                            <Card
                                key={`${testimonial.id}-${currentIndex}-${index}`}
                                className="group h-full bg-white rounded-3xl border-0 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] overflow-hidden"
                            >
                                <CardContent className="p-8 relative">
                                    {/* Gradient accent */}
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-accent/10 to-primary/10 rounded-bl-3xl" />

                                    {/* Quote icon */}
                                    <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <Quote className="h-12 w-12 text-primary" />
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center mb-6">
                                        {[...Array(testimonial.rating)].map(
                                            (_, i) => (
                                                <Star
                                                    key={i}
                                                    className="h-5 w-5 fill-accent text-accent"
                                                />
                                            )
                                        )}
                                    </div>

                                    {/* Content */}
                                    <blockquote className="text-slate-700 mb-8 italic text-lg leading-relaxed font-medium">
                                        "{testimonial.content}"
                                    </blockquote>

                                    {/* Property Details */}
                                    <div className="space-y-2 mb-6 text-sm text-slate-600">
                                        <div className="flex items-center">
                                            <Home className="h-4 w-4 text-primary mr-2" />
                                            <span>{testimonial.property}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <MapPin className="h-4 w-4 text-primary mr-2" />
                                            <span>{testimonial.location}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Calendar className="h-4 w-4 text-primary mr-2" />
                                            <span>{testimonial.date}</span>
                                        </div>
                                    </div>

                                    {/* Author */}
                                    <div className="flex items-center pt-4 border-t border-slate-200">
                                        <div className="relative">
                                            <img
                                                src={
                                                    testimonial.image ||
                                                    "/placeholder.svg"
                                                }
                                                alt={testimonial.name}
                                                className="w-16 h-16 rounded-2xl mr-4 ring-2 ring-primary/20"
                                            />
                                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                                                <Star className="w-3 h-3 text-white fill-white" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-lg text-slate-800">
                                                {testimonial.name}
                                            </div>
                                            <div className="text-sm text-primary font-semibold">
                                                {testimonial.role}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Carousel Indicators */}
                    <div className="flex justify-center mt-12 space-x-2">
                        {Array.from({
                            length: Math.ceil(
                                testimonials.length / testimonialsPerPage
                            ),
                        }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() =>
                                    setCurrentIndex(index * testimonialsPerPage)
                                }
                                className={`w-3 h-3 rounded-full transition-all ${
                                    Math.floor(
                                        currentIndex / testimonialsPerPage
                                    ) === index
                                        ? "bg-primary scale-125"
                                        : "bg-gray-300 hover:bg-gray-400"
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

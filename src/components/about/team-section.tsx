"use client"

import { Badge } from "@/components/ui/badge";
import { Linkedin, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import React from "react";
import Image from "next/image";

const teamMembers = [
    {
        name: "Mpho Moremong-Gobe",
        role: "Founder & CEO",
        images: [
            "mgobe.jpg",
            "mgobe2.png",
            "mgobe3.png",
        ],
        bio: "With over 28 years of experience in real estate, Mpho leads our team with vision and expertise. Her work spans property valuations, management, sales, and advisory services, ensuring that clients receive reliable guidance and practical solutions. At MG Properties, Mpho is committed to helping individuals, families, and investors make confident property decisions.",
        email: "mgobe@mgproperties.co.bw",
        // phone: "(555) 123-4567",
        specialties: [
            "Valuations",
            "Luxury Homes",
            "Investment Properties",
            "Market Analysis",
            "Team Leadership"
        ],
        achievements: [
            "First citizen Chartered Surveyor, Botswana",
            "Founded MG Properties in 2009",
            "500+ successful transactions",
            "Top 1% of agents nationally",
            "Real Estate Excellence Award 2023",
        ],
    },
];

export function TeamSection() {

    const [ currentImageIndex, setCurrentImageIndex ] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex((prev) =>
            prev === teamMembers[0].images.length - 1 ? 0 : prev + 1
        );
    };

    const previousImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? teamMembers[0].images.length - 1 : prev - 1
        );
    };

    return (
        <section className="py-24 bg-gradient-to-b from-green-50/30 to-slate-50 relative overflow-hidden">
            {/* Warm background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-32 left-20 w-72 h-72 bg-gradient-to-br from-accent/8 to-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-16 w-96 h-96 bg-gradient-to-tr from-primary/5 to-accent/8 rounded-full blur-2xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Editorial Header */}
                <div className="text-center mb-20">
                    <Badge className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20 rounded-full text-accent font-semibold mb-8">
                        Meet Our Founder
                    </Badge>
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 text-slate-800 leading-tight">
                        Visionary Leadership
                        <span className="block bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                            Behind MG Properties
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-accent to-primary mx-auto mb-8" />
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        Meet the visionary who founded MG Properties and
                        continues to lead our mission of helping families find
                        their perfect homes
                    </p>
                </div>

                {/* Team Grid */}
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {teamMembers.map((member, index) => (
                            <React.Fragment key={index}>
                                {/* Left Column - Image */}
                                <div className="relative">
                                    <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
                                        <div className="relative w-full h-[650px] rounded-3xl overflow-hidden">
                                            <Image
                                                src={
                                                    member.images[currentImageIndex] ||
                                                    "/placeholder.svg"
                                                }
                                                alt={`${member.name} - Photo ${currentImageIndex + 1}`}
                                                fill
                                                /* width={400}
                                                height={700} */
                                                /* className="w-full h-[700px] object-cover" */
                                                style={{ objectFit: "contain", objectPosition: "center top" }}
                                                quality={50}
                                                priority
                                            />
                                        </div>
                                       
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                        {/* Navigation Arrows */}
                                        {member.images.length > 1 && (
                                            <>
                                                <button
                                                    onClick={previousImage}
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all opacity-0 group-hover:opacity-100"
                                                >
                                                    <ChevronLeft className="h-6 w-6 text-slate-800" />
                                                </button>
                                                <button
                                                    onClick={nextImage}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all opacity-0 group-hover:opacity-100"
                                                >
                                                    <ChevronRight className="h-6 w-6 text-slate-800" />
                                                </button>
                                            </>
                                        )}

                                        {/* Dot Indicators */}
                                        {member.images.length > 1 && (
                                            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2">
                                                {member.images.map((_, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => setCurrentImageIndex(index)}
                                                        className={`transition-all rounded-full ${
                                                            index === currentImageIndex
                                                                ? 'w-8 h-2 bg-white'
                                                                : 'w-2 h-2 bg-white/50 hover:bg-white/75'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                        {/* Floating contact info */}
                                        <div className="absolute bottom-6 left-6 right-6">
                                            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex space-x-3">
                                                        <a
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            href="https://www.linkedin.com/in/mpho-moremong-gobe-119a1630/"
                                                        >
                                                            <div className="p-2 bg-primary/10 rounded-xl">
                                                                <Linkedin className="h-5 w-5 text-primary" />
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-sm text-slate-700">
                                                            <a
														        href={`mailto:${member.email}`}
                                                                className="hover:underline"
                                                            >
                                                                {member.email}
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - Content */}
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-4xl font-bold text-slate-800 mb-3">
                                            {member.name}
                                        </h3>
                                        <div className="text-2xl text-primary font-semibold mb-6">
                                            {member.role}
                                        </div>
                                        <p className="text-lg text-slate-600 leading-relaxed mb-8">
                                            {member.bio}
                                        </p>
                                    </div>

                                    {/* Achievements */}
                                    <div>
                                        <h4 className="text-xl font-bold text-slate-800 mb-4">
                                            Key Achievements
                                        </h4>
                                        <div className="space-y-3">
                                            {member.achievements.map(
                                                (achievement, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="flex items-center"
                                                    >
                                                        <div className="w-2 h-2 bg-accent rounded-full mr-4"></div>
                                                        <span className="text-slate-700">
                                                            {achievement}
                                                        </span>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    {/* Specialties */}
                                    <div>
                                        <h4 className="text-xl font-bold text-slate-800 mb-4">
                                            Areas of Expertise
                                        </h4>
                                        <div className="flex flex-wrap gap-3">
                                            {member.specialties.map(
                                                (specialty, idx) => (
                                                    <Badge
                                                        key={idx}
                                                        variant="secondary"
                                                        className="px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 text-primary border-0 rounded-xl font-medium"
                                                    >
                                                        {specialty}
                                                    </Badge>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

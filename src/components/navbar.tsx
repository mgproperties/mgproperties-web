"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navigation = [
        { name: "Properties", href: "/properties" },
        { name: "About", href: "/about" },
        { name: "Services", href: "/services" },
        { name: "Testimonials", href: "/testimonials" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <nav
            className={`fixed top-0 z-50 w-full transition-all duration-300 ${
                isScrolled
                    ? "bg-white/95 backdrop-blur-lg border-b border-gray-200/60 shadow-lg"
                    : "bg-white/90 backdrop-blur-md"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="flex items-center space-x-3 group"
                        >
                            <div className="p-2 bg-gradient-to-br from-primary to-primary-600 rounded-2xl group-hover:scale-105 transition-transform shadow-lg">
                                <Home className="h-6 w-6 text-white" />
                            </div>
                            <span className="font-bold text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                MG Properties
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-gray-600 hover:text-primary transition-colors font-medium relative group"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all group-hover:w-full"></span>
                            </Link>
                        ))}
                        <Button className="bg-gradient-to-r from-accent to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white shadow-lg hover:shadow-xl transition-all rounded-2xl font-semibold">
                            Get Started
                        </Button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(!isOpen)}
                            className="rounded-xl"
                        >
                            {isOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden animate-fade-in">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t bg-white/95 backdrop-blur-md rounded-b-2xl">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="block px-3 py-3 text-gray-600 hover:text-primary transition-colors font-medium rounded-xl"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="px-3 py-2">
                                <Button className="w-full bg-gradient-to-r from-accent to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white rounded-2xl font-semibold">
                                    Get Started
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Send,
    User,
    Mail,
    Phone,
    MessageSquare,
    Home,
    DollarSign,
} from "lucide-react";

export function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: "",
        propertyType: "House",
        budget: "$500K - $750K",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log("Form submitted:", formData);
    };

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <section className="py-24 bg-gradient-to-b from-slate-50 to-green-50/30 relative overflow-hidden">
            {/* Soft background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-primary/5 to-accent/3 rounded-full blur-2xl" />
                <div className="absolute bottom-32 right-16 w-80 h-80 bg-gradient-to-tr from-accent/3 to-primary/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left Column - Form */}
                    <div>
                        <div className="mb-12">
                            <Badge className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-full text-primary font-semibold mb-6">
                                Contact Form
                            </Badge>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800 leading-tight">
                                Send Us a
                                <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                    Message
                                </span>
                            </h2>
                            <p className="text-xl text-slate-600 leading-relaxed">
                                Fill out the form below and we'll get back to
                                you within 24 hours with personalized
                                assistance.
                            </p>
                        </div>

                        <Card className="bg-white rounded-3xl border-0 shadow-2xl overflow-hidden">
                            <CardContent className="p-8">
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    {/* Name and Email Row */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Your Full Name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-lg hover:shadow-md"
                                                required
                                            />
                                        </div>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Your Email Address"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-lg hover:shadow-md"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Phone and Subject Row */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
                                            <input
                                                type="tel"
                                                name="phone"
                                                placeholder="Your Phone Number"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-lg hover:shadow-md"
                                            />
                                        </div>
                                        <div className="relative">
                                            <MessageSquare className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
                                            <select
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-lg hover:shadow-md appearance-none cursor-pointer"
                                            >
                                                <option value="General Inquiry">
                                                    General Inquiry
                                                </option>
                                                <option value="Buy Property">
                                                    Buy Property
                                                </option>
                                                <option value="Sell Property">
                                                    Sell Property
                                                </option>
                                                <option value="Rent Property">
                                                    Rent Property
                                                </option>
                                                <option value="Property Valuation">
                                                    Property Valuation
                                                </option>
                                                <option value="Investment Consulting">
                                                    Investment Consulting
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Property Type and Budget Row */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="relative">
                                            <Home className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
                                            <select
                                                name="propertyType"
                                                value={formData.propertyType}
                                                onChange={handleChange}
                                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-lg hover:shadow-md appearance-none cursor-pointer"
                                            >
                                                <option value="House">
                                                    House
                                                </option>
                                                <option value="Condo">
                                                    Condo
                                                </option>
                                                <option value="Townhouse">
                                                    Townhouse
                                                </option>
                                                <option value="Villa">
                                                    Villa
                                                </option>
                                                <option value="Commercial">
                                                    Commercial
                                                </option>
                                            </select>
                                        </div>
                                        <div className="relative">
                                            <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
                                            <select
                                                name="budget"
                                                value={formData.budget}
                                                onChange={handleChange}
                                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-lg hover:shadow-md appearance-none cursor-pointer"
                                            >
                                                <option value="Under P500K">
                                                    Under P500K
                                                </option>
                                                <option value="P500K - P750K">
                                                    P500K - P750K
                                                </option>
                                                <option value="P750K - P1M">
                                                    P750K - P1M
                                                </option>
                                                <option value="P1M - P2M">
                                                    P1M - P2M
                                                </option>
                                                <option value="P2M+">
                                                    P2M+
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <textarea
                                            name="message"
                                            placeholder="Tell us about your real estate needs..."
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={6}
                                            className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-lg hover:shadow-md resize-none"
                                            required
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full bg-gradient-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg hover:shadow-xl transition-all rounded-2xl py-6 text-xl font-semibold group"
                                    >
                                        <Send className="mr-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                                        Send Message
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Additional Info */}
                    <div className="space-y-8">
                        <div>
                            <Badge className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20 rounded-full text-accent font-semibold mb-6">
                                Why Choose Us
                            </Badge>
                            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-slate-800 leading-tight">
                                Experience the
                                <span className="block bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                                    MG Properties Difference
                                </span>
                            </h3>
                        </div>

                        <div className="space-y-6">
                            {[
                                {
                                    title: "24/7 Support",
                                    description:
                                        "Our dedicated team is available around the clock to assist with your real estate needs.",
                                    gradient: "from-primary/10 to-accent/10",
                                },
                                {
                                    title: "Market Expertise",
                                    description:
                                        "15+ years of local market knowledge ensures you get the best deals and investment opportunities.",
                                    gradient: "from-accent/10 to-primary/10",
                                },
                                {
                                    title: "Personalized Service",
                                    description:
                                        "Every client receives customized solutions tailored to their unique goals and preferences.",
                                    gradient: "from-primary/10 to-secondary/10",
                                },
                                {
                                    title: "Proven Results",
                                    description:
                                        "98% client satisfaction rate with over 500 successful transactions in the past year.",
                                    gradient: "from-secondary/10 to-accent/10",
                                },
                            ].map((feature, index) => (
                                <Card
                                    key={index}
                                    className="bg-white rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] overflow-hidden"
                                >
                                    <CardContent className="p-6 relative">
                                        <div
                                            className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-bl-2xl`}
                                        />
                                        <h4 className="text-xl font-bold text-slate-800 mb-3">
                                            {feature.title}
                                        </h4>
                                        <p className="text-slate-600 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

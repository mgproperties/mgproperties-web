"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
} from "lucide-react";

export function ContactInfo() {
    const [activeOffice, setActiveOffice] = useState("gaborone");

    const officeData = {
        gaborone: {
            address: "Plot No: 20695 Unit 7\nOff Western Bypass\nGaborone",
            phone: "(+267) 3105497\n(+267) 3105498 (Fax)",
            mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d906.8134388228951!2d25.915042428470695!3d-24.614937498624936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ebb5b3c2ceea9bf%3A0xb3b127e4da28608b!2s9WP8%2B27%2C%20Gaborone!5e0!3m2!1sen!2sbw!4v1753470241166!5m2!1sen!2sbw",
        },
        francistown: {
            address: "Plot No: 3996 Minestone\nFrancistown",
            phone: "(+267) 2412011\n(+267) 2412072 (Fax)",
            mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7441.104480704835!2d27.508397651474738!3d-21.17021032108982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1eb4686f2ab04855%3A0x10d6259cc4e97f6f!2sMinestone%2C%20Francistown!5e0!3m2!1sen!2sbw!4v1754662820864!5m2!1sen!2sbw",
        },
    };

    const currentOffice = officeData[activeOffice];

    return (
        <section className="py-24 bg-gradient-to-b from-green-50/30 to-slate-50 relative overflow-hidden">
            {/* Warm background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-32 left-20 w-72 h-72 bg-gradient-to-br from-accent/8 to-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-16 w-96 h-96 bg-gradient-to-tr from-primary/5 to-accent/8 rounded-full blur-2xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Information */}
                    <div>
                        <h3 className="text-3xl md:text-4xl font-bold mb-8 text-slate-800 leading-tight">
                            Visit Our
                            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                Offices
                            </span>
                        </h3>

                        {/* Office Selector */}
                        <div className="flex space-x-3 mb-8">
                            {[
                                { key: "gaborone", label: "Gaborone Office" },
                                {
                                    key: "francistown",
                                    label: "Francistown Office",
                                },
                            ].map((office) => (
                                <button
                                    key={office.key}
                                    onClick={() => setActiveOffice(office.key)}
                                    className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                                        activeOffice === office.key
                                            ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg transform scale-105"
                                            : "bg-white text-slate-600 hover:bg-slate-50 shadow-md hover:shadow-lg hover:scale-[1.02] border border-slate-100"
                                    }`}
                                >
                                    {office.label}
                                </button>
                            ))}
                        </div>

                        <div className="space-y-6">
                            {[
                                {
                                    icon: MapPin,
                                    title: "Address",
                                    content: currentOffice.address,
                                    gradient: "from-primary to-primary-600",
                                },
                                {
                                    icon: Phone,
                                    title: "Phone",
                                    content: currentOffice.phone,
                                    gradient: "from-accent to-accent-600",
                                },
                                {
                                    icon: Mail,
                                    title: "Email",
                                    content: "info@mgproperties.co.bw",
                                    gradient: "from-secondary to-secondary-600",
                                },
                                {
                                    icon: Clock,
                                    title: "Office Hours",
                                    content:
                                        "Monday - Friday: 8:00 AM - 5:00 PM",
                                    gradient: "from-primary to-accent",
                                },
                            ].map((item, index) => (
                                <Card
                                    key={index}
                                    className="bg-white rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] overflow-hidden group"
                                >
                                    <CardContent className="p-6 flex items-start space-x-4">
                                        <div
                                            className={`p-3 bg-gradient-to-br ${item.gradient} rounded-2xl group-hover:scale-110 transition-transform`}
                                        >
                                            <item.icon className="h-6 w-6 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-slate-800 mb-2">
                                                {item.title}
                                            </h4>
                                            <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                                                {item.content}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Social Media */}
                        <div className="mt-12">
                            <h4 className="text-xl font-bold text-slate-800 mb-6">
                                Follow Us
                            </h4>
                            <div className="flex space-x-4">
                                {[
                                    {
                                        Icon: Facebook,
                                        url: "https://www.facebook.com/mgpropertiesbw/",
                                    },
                                    {
                                        Icon: Twitter,
                                        url: "https://x.com/mgproperties_bw",
                                    },
                                    {
                                        Icon: Instagram,
                                        url: "https://www.instagram.com/mgproperties",
                                    },
                                    {
                                        Icon: Linkedin,
                                        url: "https://bw.linkedin.com/company/mgproperties",
                                    },
                                ].map(({ Icon, url }, index) => (
                                    <a
                                        key={index}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 hover:from-primary hover:to-accent rounded-2xl transition-all cursor-pointer group hover:scale-110"
                                    >
                                        <Icon className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Map */}
                    <div>
                        <h3 className="text-3xl md:text-4xl font-bold mb-8 text-slate-800 leading-tight">
                            Find Us on
                            <span className="block bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                                the Map
                            </span>
                        </h3>

                        <Card className="bg-white rounded-3xl border-0 shadow-2xl overflow-hidden h-96">
                            <CardContent className="p-0 h-full">
                                <iframe
                                    src={currentOffice.mapSrc}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="rounded-3xl"
                                ></iframe>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}

import Link from "next/link";
import Image from "next/image";
import {
    Home,
    Phone,
    Mail,
    MapPin,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
} from "lucide-react";
import { PiTiktokLogo } from "react-icons/pi";

export function Footer() {
    return (
        <footer className="bg-slate-800 text-white relative overflow-hidden">
            {/* Subtle geometric background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-primary/10 to-accent/5 rounded-full blur-2xl" />
                <div className="absolute bottom-32 left-16 w-80 h-80 bg-gradient-to-tr from-accent/8 to-primary/5 rounded-full blur-3xl" />
            </div>

            {/* Newsletter Section */}
            {/* Removed Newsletter Section */}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                    {/* Company Info */}
                    <div className="space-y-6">
                        <Link
                            href="/"
                            className="flex items-center space-x-3 group"
                        >
                            {/* <div className="p-3 bg-gradient-to-br from-primary to-primary-600 rounded-2xl group-hover:scale-105 transition-transform shadow-lg">
                                <Home className="h-8 w-8 text-white" />
                            </div> */}
                            <Image
                                src="/logo.png"
                                alt="MG Properties Logo"
                                width={125}
                                height={125}
                                className="rounded-lg"
                            />
                            {/* <span className="font-bold text-2xl text-primary bg-clip-text">
                                MG Properties
                            </span> */}
                        </Link>
                        <p className="text-white/70 leading-relaxed">
                            Your trusted partner in finding the perfect home.
                            Professional service with proven results for over 15
                            years.
                        </p>
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
                                // {
                                //     Icon: Instagram,
                                //     url: "https://www.instagram.com/",
                                // },
                                {
                                    Icon: Linkedin,
                                    url: "https://bw.linkedin.com/company/mgproperties",
                                },
                                {
                                    Icon: PiTiktokLogo,
                                    url: "https://www.tiktok.com/@mg_propertiesbw",
                                },
                            ].map(({ Icon, url }, index) => (
                                <a
                                    key={index}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-white/10 hover:bg-gradient-to-br hover:from-primary hover:to-accent rounded-2xl border border-white/20 hover:border-transparent transition-all cursor-pointer group shadow-sm hover:shadow-lg backdrop-blur-sm"
                                >
                                    <Icon className="h-5 w-5 text-white/70 group-hover:text-white transition-colors" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="text-center">
                        <h3 className="font-bold text-xl mb-6 text-white">
                            Quick Links
                        </h3>
                        <div className="space-y-4">
                            {[
                                { name: "Properties", href: "/properties" },
                                { name: "About Us", href: "/about" },
                                { name: "Services", href: "/services" },
                                // { name: "Testimonials", href: "/testimonials" },
                                { name: "Contact", href: "/contact" },
                            ].map((item) => (
                                <li key={item.name} className="list-none">
                                    <Link
                                        href={item.href}
                                        className="text-white/70 hover:text-accent transition-colors font-medium block text-center"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </div>
                    </div>

                    {/* Services */}
                    {/* <div>
                        <h3 className="font-bold text-xl mb-6 text-white">
                            Services
                        </h3>
                        <div className="space-y-4">
                            {[
                                "Buy Property",
                                "Sell Property",
                                "Rent Property",
                                "Property Valuation",
                                "Investment Consulting",
                            ].map((item) => (
                                <li key={item} className="list-none">
                                    <Link
                                        href={`/${item
                                            .toLowerCase()
                                            .replace(" ", "-")}`}
                                        className="text-white/70 hover:text-accent transition-colors font-medium block"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </div>
                    </div> */}

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-bold text-xl mb-6 text-white">
                            Contact Info
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <div className="p-2 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl backdrop-blur-sm mt-1">
                                    <MapPin className="h-5 w-5 text-accent" />
                                </div>
                                <div className="text-white/70 font-medium leading-relaxed">
                                    Plot 20695 Unit 7, Gaborone, Botswana
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl backdrop-blur-sm">
                                    <Phone className="h-5 w-5 text-accent" />
                                </div>
                                <span className="text-white/70 font-medium">
                                    (+267) 3105497
                                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl backdrop-blur-sm">
                                    <Mail className="h-5 w-5 text-accent" />
                                </div>
                                <span className="text-white/70 font-medium">
                                    info@mgproperties.co.bw
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-white/60 font-medium text-center md:text-left">
                            &copy; 2025 MG Properties. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6 text-sm">
                            <Link
                                href="/privacy"
                                className="text-white/60 hover:text-accent transition-colors font-medium"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/terms"
                                className="text-white/60 hover:text-accent transition-colors font-medium"
                            >
                                Terms of Service
                            </Link>
                            <Link
                                href="/cookies"
                                className="text-white/60 hover:text-accent transition-colors font-medium"
                            >
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

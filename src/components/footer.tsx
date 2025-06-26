import Link from "next/link"
import { Home, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-secondary text-white relative overflow-hidden">
      {/* Bold Geometric Elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/10 transform rotate-45 translate-x-32 translate-y-32" />

      {/* Newsletter Section - Bold CTA */}
      <div className="border-b border-white/20">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 py-16">
          <div className="grid grid-cols-12 gap-8 items-center">
            <div className="col-span-12 lg:col-span-8">
              <h3 className="text-4xl md:text-5xl font-black mb-4">
                STAY <span className="text-accent">UPDATED</span>
              </h3>
              <p className="text-xl text-white/80 font-medium">
                Get exclusive property listings and market insights delivered to your inbox
              </p>
            </div>
            <div className="col-span-12 lg:col-span-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="YOUR EMAIL ADDRESS"
                  className="flex-1 px-6 py-4 bg-white text-slate-900 border-2 border-slate-900 font-medium placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-accent uppercase tracking-wide text-sm"
                />
                <Button className="bg-accent hover:bg-accent-600 text-white font-bold px-8 py-4 uppercase tracking-wide shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition-all duration-200">
                  SUBSCRIBE
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info - Bold Branding */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary border-2 border-white">
                <Home className="h-8 w-8 text-white" />
              </div>
              <span className="font-black text-3xl">
                PRIME<span className="text-accent">REALTY</span>
              </span>
            </div>
            <p className="text-white/80 leading-relaxed font-medium">
              Your trusted partner in finding the perfect home. Professional service with proven results.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <div
                  key={index}
                  className="p-3 bg-white/10 hover:bg-accent border-2 border-white/20 hover:border-accent transition-all cursor-pointer group"
                >
                  <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links - Clean Typography */}
          <div>
            <h3 className="font-black text-xl mb-6 uppercase tracking-wide">QUICK LINKS</h3>
            <ul className="space-y-4">
              {["PROPERTIES", "ABOUT US", "SERVICES", "CONTACT", "BLOG"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(" ", "")}`}
                    className="text-white/80 hover:text-accent transition-colors font-medium flex items-center group uppercase tracking-wide text-sm"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-black text-xl mb-6 uppercase tracking-wide">SERVICES</h3>
            <ul className="space-y-4">
              {["BUY PROPERTY", "SELL PROPERTY", "RENT PROPERTY", "VALUATION", "MANAGEMENT"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-white/80 hover:text-accent transition-colors font-medium flex items-center group uppercase tracking-wide text-sm"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info - Bold Layout */}
          <div>
            <h3 className="font-black text-xl mb-6 uppercase tracking-wide">CONTACT INFO</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-primary border border-white/20 mt-1">
                  <MapPin className="h-5 w-5" />
                </div>
                <span className="text-white/80 font-medium">
                  123 REAL ESTATE AVE
                  <br />
                  CITY, STATE 12345
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary border border-white/20">
                  <Phone className="h-5 w-5" />
                </div>
                <span className="text-white/80 font-medium">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary border border-white/20">
                  <Mail className="h-5 w-5" />
                </div>
                <span className="text-white/80 font-medium">INFO@PRIMEREALTY.COM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <p className="text-white/60 font-medium uppercase tracking-wide text-sm">
            &copy; 2024 PRIMEREALTY. ALL RIGHTS RESERVED. | PRIVACY POLICY | TERMS OF SERVICE
          </p>
        </div>
      </div>
    </footer>
  )
}

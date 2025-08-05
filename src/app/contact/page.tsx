import { Navbar } from "@/components/layout/navbar";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";
import { Footer } from "@/components/layout/footer";

export default function ContactPage() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <ContactHero />
            <ContactForm />
            <ContactInfo />
            <Footer />
        </div>
    );
}

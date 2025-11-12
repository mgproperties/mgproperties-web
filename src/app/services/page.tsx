import { Navbar } from "@/components/layout/navbar";
import { ServicesHero } from "@/components/services/services-hero";
import { VideoTestimonials } from "@/components/services/services-videos";
import { Services } from "@/components/services/services";
import { Footer } from "@/components/layout/footer";

export default function ServicesPage() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <ServicesHero />
            <VideoTestimonials />
            <Services />
            <Footer />
        </div>
    );
}

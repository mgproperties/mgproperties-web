import { Navbar } from "@/components/layout/navbar";
import HeroSection from "@/components/homepage/hero-section-wrapper";
import { FeaturedProperties } from "@/components/homepage/featured-properties";
import { Footer } from "@/components/layout/footer";

export default function Page() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <HeroSection />
            <FeaturedProperties />
            <Footer />
        </div>
    );
}

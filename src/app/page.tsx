import { Navbar } from "@/components/navbar";
import HeroSection from "@/components/hero-section-wrapper";
import { FeaturedProperties } from "@/components/featured-properties";
import { Footer } from "@/components/footer";

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

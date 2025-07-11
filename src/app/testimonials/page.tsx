import { Navbar } from "@/components/navbar";
import { TestimonialsHero } from "@/components/testimonials-hero";
import { TestimonialsGrid } from "@/components/testimonials-grid";
import { VideoTestimonials } from "@/components/video-testimonials";
import { TestimonialsStats } from "@/components/testimonials-stats";
import { Footer } from "@/components/footer";

export default function TestimonialsPage() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <TestimonialsHero />
            <VideoTestimonials />
            <TestimonialsGrid />
            <TestimonialsStats />
            <Footer />
        </div>
    );
}

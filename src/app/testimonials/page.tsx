import { Navbar } from "@/components/layout/navbar";
import { TestimonialsHero } from "@/components/testimonials/testimonials-hero";
import { TestimonialsGrid } from "@/components/testimonials/testimonials-grid";
import { VideoTestimonials } from "@/components/testimonials/video-testimonials";
import { TestimonialsStats } from "@/components/testimonials/testimonials-stats";
import { Footer } from "@/components/layout/footer";

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

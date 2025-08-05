import { Navbar } from "@/components/layout/navbar";
import { AboutHero } from "@/components/about/about-hero";
import { AboutStory } from "@/components/about/about-story";
import { TeamSection } from "@/components/about/team-section";
import { AboutValues } from "@/components/about/about-values";
import { Footer } from "@/components/layout/footer";

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <AboutHero />
            <AboutStory />
            <TeamSection />
            <AboutValues />
            <Footer />
        </div>
    );
}

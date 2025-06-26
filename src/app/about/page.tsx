import { Navbar } from "@/components/navbar"
import { AboutHero } from "@/components/about-hero"
import { AboutStory } from "@/components/about-story"
import { TeamSection } from "@/components/team-section"
import { AboutValues } from "@/components/about-values"
import { Footer } from "@/components/footer"

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
  )
}

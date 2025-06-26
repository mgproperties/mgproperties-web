import { Navbar } from "@/components/navbar"
import { ServicesHero } from "@/components/services-hero"
import { Services } from "@/components/services"
import { Footer } from "@/components/footer"

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <ServicesHero />
      <Services />
      <Footer />
    </div>
  )
}

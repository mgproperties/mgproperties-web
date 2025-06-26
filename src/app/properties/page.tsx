import { Navbar } from "@/components/navbar"
import { PropertiesHero } from "@/components/properties-hero"
import { PropertiesFilters } from "@/components/properties-filters"
import { PropertiesGrid } from "@/components/properties-grid"
import { Footer } from "@/components/footer"

export default function PropertiesPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <PropertiesHero />
      <PropertiesFilters />
      <PropertiesGrid />
      <Footer />
    </div>
  )
}
